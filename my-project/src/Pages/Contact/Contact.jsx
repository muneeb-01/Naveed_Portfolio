import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const Contact = () => {
  useEffect(() => {
    document.body.setAttribute("theme", "white");
  }, []);
  return <div className="w-full font-poppins h-[100vh] flex justify-center items-center">
    <div className="w-[90%] md:w-[80%] lg:w-[60%] xl:w-[40%] 2xl:w-[25%] flex flex-col justify-center items-start gap-[4vh]">
      <p className='tracking-tighter text-[0.8rem]'>LETS HAVE A CHAT</p>
      <h2 className=' font-Crisp text-[2rem] md:text-[3rem]'>naveed.official@gmail.com</h2>
      <p className=' font-light'>Reach out with your name and your company details–any helpful insights about your project and vision are appreciated. We’d love to connect and help elevate your brand.</p>
      <div className=' flex justify-between items-center w-full'><p>PHONE +923400000000</p> <Link>INSTAGRAM</Link></div>
    </div>
  </div>;
};

export default Contact;
