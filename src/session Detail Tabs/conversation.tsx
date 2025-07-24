import { formatFileLastViewed } from "@/constants/constants"
import downloadIcon from '@/assets/icons/downloadIcon.png'


function Conversation({conversations}:{conversations:{name:string, email:string, message:string, file:{fileName:string}, timestamp:string}[]}) {
  return (
    <>
      {
        Array.isArray(conversations) && conversations.map((conversation) => {
          const { formattedDate, formattedTime } = formatFileLastViewed(conversation.timestamp);
  
          return(
            
              <div className="flex gap-4 my-6 px-5 w-full border-[#f5f5f5] border-b-2">
                <div className="bg-gray-500 size-10 rounded-full flex justify-center items-center">
                  {/* <img
                    className="h-8 w-8 rounded-xl object-cover"
                    src="https://picsum.photos/300/200"
                    alt={conversation.name}
                    width={40}
                    height={40}
                  /> */}
                </div>
                <div className="flex flex-col mb-5 w-full">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2"> 
                      <p className=" font-inter-600 text-text-primary ">{conversation.name}</p>
                      <p className="text-sm text-inActive-green font-inter-500">{conversation.email}</p>
                    </div  >
                    <span className="text-xs hidden sm:block text-inActive-green font-inter-500 mt-1">
                    {formattedDate} at {formattedTime}
                  </span>
                  </div>
                  <p className=" text-text-primary font-inter-500 mt-2">{conversation.message}</p>
                  {conversation.file &&  (
                    <div className="mt-2 self-start flex gap-4 bg-[#f8f8f8] border border-stroke-2 p-3 rounded-lg w-auto items-center">
                      
                        <p  className="text-sm text-text-primary  font-inter-500 mr-2">
                          {conversation.file.fileName}
                        </p>
                      <img src={downloadIcon} className="size-5" alt="download icon" />
                    </div>
                  )}
                  <span className="text-xs block sm:hidden text-inActive-green font-inter-500 mt-1">
                    {formattedDate} at {formattedTime}
                  </span>
                </div>
              </div>
            
          )
        })
      }
    </>
  )
}

export default Conversation