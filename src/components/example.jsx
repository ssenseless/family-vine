import * as React from 'react'
import { useState } from 'react'

export default function Example() {
    // Create state for medias and media creation status
    const [mediaCreationStatus, setMediaCreationStatus] = useState("Try to add Media!");
    const [medias, setMedias] = useState([])

    // Open a file dialog and update the filepath
    async function addMedia() {
        let failed = await window.electronAPI.createMedia();
        if (!failed) {
            setMediaCreationStatus("Sucessfully added media to DB!")
        } else {
            setMediaCreationStatus("Failed to add media to DB :(")
        }
    }

    async function getMedia() {
        setMedias(
            await window.electronAPI.getMedia()
        )
        console.log(medias)
    }

    return (
        <>
            <h2>Try to Add Media to DB: </h2>
            <button onClick={addMedia}>Add Media</button>
            <p>{mediaCreationStatus}</p>
            <br/>
            <h2>Try to Read Media from DB: </h2>
            <button onClick={getMedia}>Get Media</button>
            <ol>
                {
                    medias.map(media => (
                        <li key={media.dataValues.key}>{media.dataValues.filepath}</li>
                    ))
                }
            </ol>
        </>
    )
}
