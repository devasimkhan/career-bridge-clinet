import React, { useEffect, useState } from 'react'
import Card from './Card'
import Button from './Button'
import { useMutation } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import adminService from '../services/adminService'
import { setCategories} from '../features/admin/adminSlice'
import toast from 'react-hot-toast'

const CategoryForm = ({handleShowForm}) => {

const [title , setTitle] = useState("")

const dispatch = useDispatch()

const {mutate , data , isSuccess , isPending , isError , error} = useMutation({mutationFn : (credentials)=> adminService.addCategory(credentials)})

const {user} = useSelector(state => state.auth)

const handleAddCategory = (e) => {
  e.preventDefault()
 
  mutate({
    token : user.token ,
    title : title
  })
}


    useEffect(() => {

        if (isSuccess) {
            dispatch(setCategories(data))
            handleShowForm()  
        }

        if (isError && error) {
           toast.error(
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong"
)
        }

    }, [  isSuccess , isError , error ])

  return (
    
      <Card  color="white">
                    <form onSubmit={handleAddCategory}>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                     <input value={title} onChange={(e)=> setTitle(e.target.value)} className='w-full p-2' type="text" placeholder='Enter Category' />
    
                    </div>
                    <div className="pt-4 border-t-2 border-navy/20 flex flex-col sm:flex-row gap-2 sm:gap-0 sm:space-x-2">
                      <Button type='submit' variant="primary" size="sm" classNameName="flex-1">
                        Add 
                      </Button>
                        <Button clickAction={handleShowForm} variant="accent" size="sm" classNameName="flex-1">
                        Cancel 
                      </Button>
                    </div>
                    </form>
                  </Card>
    )
}

export default CategoryForm



