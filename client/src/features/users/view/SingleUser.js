


import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAllCompaniesQuery } from '../../companies/CompaniesApiSlice';
import { useUpdateUserMutation, useGetAllUsersQuery } from './userApiSlice';
import "./single-user.css";

const SingleUser = () => {
    const { userId } = useParams();
    const { error, data, isLoading, isError } = useGetAllUsersQuery();
    const { data: companies, isLoading: companiesLoading, error: companiesError } = useGetAllCompaniesQuery();
    const [updateUser, { error: updateError, isSuccess: updateSuccess }] = useUpdateUserMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (updateSuccess) {
            navigate("/dash/users");
        }
    }, [updateSuccess, navigate]);

    if (isLoading || companiesLoading) return <h1>Loading...</h1>;
    if (isError) return <h1>Error: {JSON.stringify(error)}</h1>;
    if (companiesError) return <h1>Error loading companies: {JSON.stringify(companiesError)}</h1>;

    const user = data?.data?.find(user => user._id === userId);

    if (!user) return <h1>User not found</h1>;

    const formSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userObject = Object.fromEntries(formData.entries());
        updateUser(userObject);
    };

    return (
        <div className='single-user-container'>
            <div className='single-user-info'>
                <div className='single-user-img-container'>
                    {user.userName}
                </div>
                <div className='single-user-form-container'>
                    <form onSubmit={formSubmit} className='single-user-form'>
                        <input name='_id' defaultValue={user._id} type='hidden' />
                        <label>שם יחודי</label>
                        <input value={user.username} readOnly type='text' name='username' placeholder='הכנס שם יחודי' />
                        <label>שם פרטי</label>
                        <input defaultValue={user.fullname} type='text' name='fullname' placeholder='הכנס שם יחודי' />
                        <label>Company</label>
                        <select name='company' id='company' required>
                            {companies?.data ? companies.data.map(company => (
                                <option key={company._id} selected={company._id === user.company?._id} value={company._id}>
                                    {company.name}
                                </option>
                            )) : <option value="">No companies available</option>}
                        </select>
                        <label>Roles</label>
                        <select name='roles' id='roles'>
                            <option value="Student">הרשאה</option>
                            <option selected={user.roles === 'Teacher'} value="Teacher">Teacher</option>
                            <option selected={user.roles === 'Student'} value="Student">Student</option>
                        </select>
                        <label>פעיל</label>
                        <select name='active' id='active'>
                            <option selected={!user.active} value={false}>לא פעיל</option>
                            <option selected={user.active} value={true}>פעיל</option>
                        </select>
                        <label>מייל</label>
                        <input defaultValue={user.email} type='email' name='email' placeholder='מייל' />
                        <button>עדכן</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SingleUser;
