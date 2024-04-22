import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { fetchPhotos, savePhotoToDb } from "../api/api";
import { calculateDimensions } from "./constant";
import { aspectRatios } from "./constant";

const Photo = () => {
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);
  const [selectedRatio, setSelectedRatio] = useState(aspectRatios[0].value);
  const [zoom, setZoom] = useState(1);
  const [photos, setPhotos] = useState([]);

  const capturePhoto = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
  }, [webcamRef]);

  const savePhoto = useCallback(async () => {
    if (!url) return;

    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async function () {
        const base64data = reader.result;

        try {
          let res = await savePhotoToDb(base64data);
          if (res && res.data) {
            console.log("Photo Saved Successfully", res.data);
            setPhotos((prevPhotos) => [...prevPhotos, res.data]);
          } else {
            console.error("Invalid response from savePhotoToDb:", res);
          }
        } catch (error) {
          console.error("Error saving photo:", error);
        }
      };
    } catch (error) {
      console.error("Error fetching photo:", error);
    }
  }, [url]);

  const handleRatioChange = (ratio) => {
    setSelectedRatio(ratio);
  };

  const handleZoomChange = (factor) => {
    setZoom(factor);
  };

  const onUserMedia = (e) => {
    console.log(e);
  };

  const handleShowAllImages = async () => {
    await fetchPhotos()
      .then((res) => setPhotos(res))
      .catch((err) => console.log(err));
  };

  const { width, height } = calculateDimensions(selectedRatio, zoom);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-screen-lg relative">
        <Webcam
          audio={false}
          height={height}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={width}
          videoConstraints={{
            width,
            height,
            facingMode: selectedRatio === "16:9" ? "user" : { exact: "user" },
          }}
          onUserMedia={onUserMedia}
          mirrored={true}
          className="top-0 left-0 w-full rounded-md"
        />
        <div className="bottom-0 right-0 p-4 flex justify-center">
          <div className="flex flex-row space-x-2">
            <button
              onClick={() => handleZoomChange(zoom - 0.2)}
              className="bg-[#006DA4] text-[#032030] font-bold py-2 px-4 rounded h-[40px] w-auto"
            >
              Zoom -
            </button>
            <button
              onClick={() => handleZoomChange(zoom + 0.2)}
              className="bg-[#006DA4] text-[#032030] font-bold px-4 rounded h-[40px] w-auto"
            >
              Zoom +
            </button>

            <button
              onClick={handleShowAllImages}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded h-[40px] w-auto"
            >
              Show All Images
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 m-2">
          {photos?.map((photo) => (
            <div key={photo._id} className="relative overflow-hidden">
              <img
                src={photo?.image?.imageUrl}
                alt="Photo"
                className="rounded-lg w-full h-full transition-transform duration-300 transform hover:scale-125"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center mt-4">
        {!url && (
          <>
            <button
              onClick={capturePhoto}
              className="bg-[#FFBA08]  text-[#D00000] font-bold py-2 px-4 rounded mb-4 md:mb-0 md:mr-4"
            >
              Click
            </button>
          </>
        )}
        {!url && (
          <>
            <div>
              <div className="space-x-2 md:space-y-0 md:ml-4 md:space-x-2">
                {aspectRatios.map((ratio) => (
                  <button
                    key={ratio.value}
                    onClick={() => handleRatioChange(ratio.value)}
                    className={`${
                      ratio.value === selectedRatio
                        ? "bg-blue-500"
                        : "bg-gray-300"
                    } hover:bg-blue-400 text-white font-bold py-2 px-4 rounded`}
                  >
                    {ratio.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
        {url && (
          <div className="flex flex-col items-center justify-center ">
            <div className="flex-col md:flex-row justify-center ">
              <button
                onClick={capturePhoto}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded mb-4 md:mb-0 md:m-4"
              >
                Click Again
              </button>
              <button
                onClick={savePhoto}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded mb-4 md:mb-0 "
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4">
        {url && (
          <div>
            <img src={url} alt="screenshot" className="rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Photo;
