import { useSelector } from 'react-redux'
import { Button, Label, Select, TextInput } from 'flowbite-react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoIosClose } from "react-icons/io";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import app from '../firebase';
import { useNavigate } from 'react-router-dom'


function CreatePost() {
    const { currentUser } = useSelector(state=> state.user)
    const [formData, setFormData] = useState({})
    const [fileInput, setFileInput] = useState(null)

    const navigate = useNavigate()
    
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        const fileName = file.name + new Date().getTime() 
        const storage = getStorage(app);

        const metadata = {
            contentType: 'image/jpeg'
          };

        const storageRef = ref(storage, fileName)


        const uploadTask = uploadBytesResumable(storageRef, file, metadata)

        uploadTask.on('state_change', (snapshot) => {
            console.log('Uploaded')
        }, (err) => {
            console.log(err)
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadUrl) => {
                if(downloadUrl){
                    setFileInput(downloadUrl)
                }
            })
        }
        )

    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value  })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

      
        const data ={
            ...formData,
            image: fileInput
        }

        console.log(currentUser._id)

        if(!fileInput || fileInput === ''){
            return
        }
        try{
            const res = await fetch('/api/post/create', {
                method: 'POST',
                headers: {"Content-Type": 'application/json'},
                body: JSON.stringify(data)
            })
            
            if(res.ok){
                navigate(`/profile/${currentUser._id}`)
            }
        }catch(err){
            console.log(err)
        }

    }
    
    const onClose = () => {
        setFileInput(null)
        setFormData({...formData, fileInput})
    }

    console.log(fileInput)

  return (
    <div className='w-full grid grid-cols-1 min-h-screen md:grid-cols-2'>
        <div className="p-10 flex flex-col items-center justify-center md:mb-[7rem]">
            <div className="h-[15em] w-[15em] rounded-md overflow-hidden">
                <img className='w-full h-full' src={currentUser.profilePicture} alt={`${currentUser.username} profile picture`} />
            </div>
            <p className='mt-2'>{currentUser.username}</p>
            <p>{currentUser.email}</p>
        </div>
        <div className="p-10">
            <form onSubmit={handleSubmit} className=''>
                <div className="">
                    <Label htmlFor='title:' value='Title:' />
                    <TextInput id='title' onChange={handleChange} required type='text' placeholder='Enter title...' />
                </div>
                <div className="">
                    <Label htmlFor='image' value='Image:'  />
                    {
                        !fileInput && (
                            <TextInput id='fileInput' type='file' onChange={handleImageChange}  />
                        )
                    }
                    {
                        fileInput && (
                            <div className="relative">
                                <img src={fileInput} alt="" />
                                <span 
                                className="absolute z-50 top-2 right-2 cursor-pointer 
                                rounded-full overflow-hidden"
                                onClick={onClose}
                                >
                                    <IoIosClose className='text-4xl bg-black' />
                                </span>
                            </div>
                        )
                    }

                </div>
                <div className="">
                        <Label htmlFor='category:' value='Category' />
                        <Select id='category' onChange={handleChange} required defaultValue='sports'>
                            <option value="sports">Sports</option>
                            <option value="politics">Politics</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="business">Business</option>
                        </Select>
                </div>
                <div className="h-[20rem]">
                    <Label htmlFor='content' value='content'  />
                    <ReactQuill onChange={(val) => setFormData({...formData, content: val})} theme='snow' className='h-[calc(20rem-4.5rem)] w-full' />
                </div>
                <Button type='submit' className='mt-'>Submit</Button>
            </form>
        </div>
    </div>
  )
}

export default CreatePost