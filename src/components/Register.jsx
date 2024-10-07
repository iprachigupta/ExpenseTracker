import {useState} from "react";

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword:''
    });

    const [errors, setErrors] = useState({});
    const handleSubmit = (e) =>{
        e.preventDefault();
        // if(validateForm()){
        //     console.log(`Form Submitted ${formData}`);
        // }
    }

    const handleInputChange = (e) =>{
        setFormData({
            ...formData,[e.target.name] : e.target.value
        })
    }

    return(
        <div className="max-h-screen flex flex-col justify-center items-center">
            <div className="bg-gray-300 p-11 rounded-lg shadow-lg shadow-gray-500/60 max-w-md w-full">
                <h2 className="text-3xl font-bold text-center mb-8">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-left text-gray-900">Username : </label>
                        <input type="text" name="username" value={formData.username} onChange={handleInputChange} className="w-full p-2 border" placeholder="Enter username"></input>
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-left text-gray-900">Email :</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-2 border" placeholder="Enter email"></input>
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-left text-gray-900">Password :</label>
                        <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full p-2 border" placeholder="Enter password"></input>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-left text-gray-900">Confirm Password :</label>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="w-full p-2 border" placeholder="Confirm password"></input>
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>

                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-lg shadow-lg shadow-blue-700/60 hover:opacity-90">Create Account</button>

                    <h4 className="text-xs text-center mt-4">Already have an account?
                        <a href="#login" className="text-blue-500 underline">Login...</a>
                    </h4>
                </form>
            </div>
        </div>
    );
}


export default Register;