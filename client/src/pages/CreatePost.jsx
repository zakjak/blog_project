import { useSelector } from 'react-redux'
import { Button, Label, Select, TextInput } from 'flowbite-react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoIosClose } from "react-icons/io";

function CreatePost() {
    const { currentUser } = useSelector(state=> state.user)
    const [input, setInput] = useState('')
    const [formData, setFormData] = useState({})
    const [fileInput, setFileInput] = useState(null)
    
    const handleImageChange = (e) => {
        const file = e.target.files[0]

        if(file){
            const reader = new FileReader()

            reader.onload = () => {
                setFileInput(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

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
            <form className=''>
                <div className="">
                    <Label htmlFor='title:' value='Title:' />
                    <TextInput required type='text' placeholder='Enter title...' />
                </div>
                <div className="">
                    <Label htmlFor='image' value='Image:'  />
                    {
                        !fileInput && (
                            <TextInput type='file' onChange={handleImageChange}  />
                        )
                    }
                    {
                        fileInput && (
                            <div className="relative">
                                <img src={fileInput} alt="" />
                                <span 
                                className="absolute z-50 top-2 right-2 cursor-pointer 
                                rounded-full overflow-hidden"
                                onClick={() => setFileInput(null)}
                                >
                                    <IoIosClose className='text-4xl bg-black' />
                                </span>
                            </div>
                        )
                    }

                </div>
                <div className="">
                        <Label htmlFor='category:' value='Category' />
                        <Select id='category' required>
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
                <Button className='mt-'>Submit</Button>
            </form>
        </div>
    </div>
  )
}

export default CreatePost