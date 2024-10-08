import {useState} from "react";
import { useNavigate } from 'react-router-dom';


function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword:''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    
    const validateForm = () => {
        const newErrors = {};
    
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.email) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Invalid email format';
        }
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(validateForm()){
            console.log(`Form Submitted ${formData}`);
        }
        localStorage.setItem('email', formData.email);
        localStorage.setItem('password', formData.password);
        // Redirect to login page after successful signup
        navigate('/login');
    }

    const handleInputChange = (e) =>{
        setFormData({
            ...formData,[e.target.name] : e.target.value
        })
    }

    return(
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="bg-gray-300 p-11 rounded-lg shadow-lg shadow-gray-500/60 max-w-md w-full">
                <h2 className="text-3xl font-bold text-center mb-8">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-left text-gray-900 mb-2">Username : </label>
                        <input type="text" name="username" value={formData.username} onChange={handleInputChange} className="w-full p-2 border" placeholder="Enter username" required></input>
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-left text-gray-900 mb-2">Email :</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-2 border" placeholder="Enter email" required></input>
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-left text-gray-900 mb-2">Password :</label>
                        <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full p-2 border" placeholder="Enter password" required></input>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-left text-gray-900 mb-2">Confirm Password :</label>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="w-full p-2 border" placeholder="Confirm password" required></input>
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>

                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-lg shadow-lg shadow-blue-700/60 hover:opacity-90">Create Account</button>

                    <h4 className="text-xs text-center mt-4">Already have an account?
                        <a href="/login" className="text-blue-500 hover:underline"> Login...</a>
                    </h4>
                </form>
            </div>
        </div>
    );
}


export default Register;