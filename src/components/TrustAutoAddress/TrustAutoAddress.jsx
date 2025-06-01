import { Email, WhatsApp } from '@mui/icons-material';
import { FaGlobe } from 'react-icons/fa';

const TrustAutoAddress = () => {
    return (
        <div>
          <div className="space-y-2 ">
            <div className="flex items-center ">
              <FaGlobe className="text-[#42A1DA]" />
              <p className="font-bold  ml-1 text-[#4671A1] text-[15px] md:text-base">www.trustautosolution.com</p>
            </div>
            <div className="flex items-center">
              <Email className="text-[#42A1DA]" />
              <p className="font-bold ml-1 text-[#4671A1] text-[15px] md:text-base">trustautosolution@gmail.com</p>
            </div>
            <div className="flex items-center ">
              <WhatsApp className="text-[#42A1DA] size-5 " size={25} />
              <p className="font-bold ml-1 text-[#4671A1] text-[15px] md:text-base">+880 1821-216465</p>
            </div>
          </div>  
        </div>
    );
};

export default TrustAutoAddress;