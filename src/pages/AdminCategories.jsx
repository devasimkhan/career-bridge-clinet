import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import adminService from '../services/adminService';
import { useEffect, useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import { setAdminData } from '../features/admin/adminSlice';
import toast from 'react-hot-toast';
import CategoryForm from '../components/CategoryForm';


export default function AdminCategories() {


  const [showForm , setShowForm] = useState(false)

  const dispatch = useDispatch()

  const {user} = useSelector(state => state.auth)
  const {categories} = useSelector(state => state.admin)

  const { data , isLoading , isError ,isSuccess ,error}  = useQuery({queryKey : ["admin"] , queryFn : ()=> adminService.fetchAdminOverview(user.token)})
   
const handleShowForm = ()=> {
  setShowForm(!showForm)
}


useEffect(() => {

  if(isSuccess){
    dispatch(setAdminData(data))
    }
  if(isError && error) {
    toast.error(error , {position : "top-center"})
  }

} , [data , isSuccess , isError , error])


if(isLoading){

   return (
    <LoadingScreen  loadingMessage ='Fetching All Data' />
   )
}


  return (
    <div className="min-h-screen bg-parchment flex flex-col overflow-x-hidden">
      <Navbar activePage="admin" />

      <div className="flex-1 flex flex-col md:flex-row">
        <Sidebar activeTab="admin_categories" role="admin" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-grid-pattern w-full min-w-0 overflow-y-auto">
          <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div>
              <div className="inline-block bg-yellow border-3 border-navy px-3 py-1 rounded-full shadow-pop-sm font-mono text-xs font-bold text-navy mb-2">
               CAREER CATEGORY
              </div>
              <h1 className="font-grotesk font-extrabold text-2xl sm:text-3xl text-navy">
                Career Categories & <span className="text-rust">Skill Tags</span>
              </h1>
            </div>
            <Button clickAction={handleShowForm} variant="accent"  size="md">
              + Add New Category
            </Button>
          </div>
         {
          showForm && <CategoryForm handleShowForm = {handleShowForm} />
         }

          <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories?.map((cat , index) => (
              <Card key={cat._id}  color="white">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                  <h3 className="font-grotesk font-extrabold text-xl text-navy">{cat?.title}</h3>
                  <StatusBadge text={index +1} status="info" />
                </div>

            
            
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
