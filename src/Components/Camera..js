import React, { useState } from 'react'
import { useEffect } from 'react';
import { useCallback } from 'react'
import Webcam from 'react-webcam';

function Camera() {
    const [ devices,setDevices] = useState([])

    const handleDevices = useCallback((MediaDevices)=>{
        setDevices(MediaDevices.filter(({kind})=>kind ==="videoinput"))
        
    },[setDevices]);

    useEffect(()=>{
        navigator.mediaDevices.enumerateDevices().then(handleDevices)
    },[handleDevices])
  return (
    <div>
        {devices.map((device,key)=>(
            <div key = {key}>
                <Webcam
                audio={false}
                videoConstraints={{deviceId:device.deviceId}}/>
                {device.label || `Device ${key+1}`}
            </div>
        ))}
    </div>
  )
}

export default Camera;