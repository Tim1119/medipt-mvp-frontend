import { IoFilterOutline } from "react-icons/io5";
import GenderDonutChart from "../charts/GenderDonutChart";
import { formatNumber } from "@/utils/helper-funtions";
import { motion } from "framer-motion";


interface StatisticCardProps{
    title?: string;
    value?: number;
    compareGenders?:boolean;
    bgIconContainer?:string;
    bgContainer:string;
    icon:string;
    header?:string;
}

const StatisticCard = ({ title, value,icon,header,bgIconContainer,bgContainer, compareGenders}:StatisticCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      style={{ backgroundColor: bgContainer }}
    //   className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 h-[140px] grid"
    >

    <div  style={{ backgroundColor: bgContainer }} className="bg-white p-4 rounded-lg shadow-md h-[140px] grid ">
        <div className={`flex items-center px-3 ${header ? "justify-between" : "justify-end"}`} >
            { header && <h3 className='font-inter font-bold text-base text-[#3c4a4a]' >{header}</h3>
            }
            <IoFilterOutline className="hover:cursor-pointer" /> 
        </div>
        
        {compareGenders ? (
             <div className="flex items-center space-x-4">
                <div className="relative grid place-items-center">
                
                    <GenderDonutChart  />  
            
                </div>
                {/* Legend */}
                <div className="flex items-center gap-2 ">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#E84F55] rounded-full"></div>
                        <span>Male</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#009899] rounded-full"></div>
                        <span>Female</span>
                    </div>
                </div>
           </div>
        ):(
            
        <div className='flex items-center gap-4 p-4' >
            <div style={{ backgroundColor: bgIconContainer }} className={`rounded-full w-[56px] h-[56px] p-3 grid place-items-center`} >
            
                {/* <Image src={icon} className='h-[14px] w-[20px]' alt={title}  /> */}
                <img src={icon} className='h-[14px] w-[20px]' alt={"stat-icon"}  />
            </div>
            <div>
                <h2 className="font-inter font-medium text-[#15171f] text-xl mb-[2px]">{value && formatNumber(value)}</h2>
                <div className="text-[#15171f] font-normal text-sm">{title}</div>
            </div>
        </div>
        )}
      
    </div>
    </motion.div>
  )
}

export default StatisticCard