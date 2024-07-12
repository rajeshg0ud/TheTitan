import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
   
  return (
    <div className=" h-52 md:h-64 font-medium m-auto font-sans  pt-4 ivory" >
      <div className="flex justify-evenly">
        <div className="px-2 sm:px-5">
          <h3 className='text-xs cursor-pointer sm:text-2xl font-bold m-1 text-black'>Company</h3>
          <ul>
            <li className=' text-xs cursor-pointer sm:text-base font-medium m-3'>About Us</li>
            <li className=' text-xs cursor-pointer sm:text-base font-medium m-3'>Team</li>
            <li className=' text-xs cursor-pointer sm:text-base font-medium m-3'>Careers</li>
            <li className=' text-xs cursor-pointer sm:text-base font-medium m-3'>Blog</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3 className='text-xs cursor-pointer sm:text-2xl font-bold m-1 text-black'>Contact</h3>
          <ul>
            <li className=' text-xs cursor-pointer sm:text-base font-medium m-3'>Contact Us</li>
            <li className=' text-xs cursor-pointer sm:text-base font-medium m-3'>Help & Support</li>
            <li className=' text-xs cursor-pointer sm:text-base font-medium m-3'>FAQs</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3 className='text-xs cursor-pointer sm:text-2xl font-bold m-1 text-black'>Connect with us</h3>
          <div className="social-icons">
            <FontAwesomeIcon className=' m-1 mx-3 size-4 sm:size-6 cursor-pointer' icon={faFacebook} />
            <FontAwesomeIcon className=' m-1 mx-3 size-4 sm:size-6 cursor-pointer'  icon={faInstagram} />
            <FontAwesomeIcon className=' m-1 mx-3 size-4 sm:size-6 cursor-pointer' icon={faTwitter} />
          </div>
        </div>
      </div>
      <div className=" text-center md:m-1 text-xs cursor-pointer sm:text-md">
        <p>&copy; Titan App. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
