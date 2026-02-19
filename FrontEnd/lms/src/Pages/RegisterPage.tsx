import React from 'react'
import { PasswordInput, TextInput, Button } from '@mantine/core'
import {  IconMail, IconLock, IconId, IconUserFilled } from '@tabler/icons-react'
import { useForm } from '@mantine/form';
import { Link } from 'react-router-dom';
import { SegmentedControl } from '@mantine/core';


const RegisterPage = () => {
       const form = useForm({
         initialValues: {
           Name: "",
           collegeId:'',
           email: '',
           password: "",
         },
     
         validate: {
           
           collegeId: (value:string) => (!value ? 'College id is required' : null),
           Name: (value:string) => (!value ? 'Name is required' : null),
           email: (value:string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
           password: (value:string) => (!value ? 'Password is required' : null),
         },
       });
      const handleSubmit = (values: typeof form.values) => {
        console.log(values);
      };
  return (
 <div
      style={{ background: 'url("/background.png")' }}
      className="h-screen w-screen !bg-cover !bg-center !bg-no-repeat flex items-center justify-center"
    >
      <div className="w-[420px] rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-pink-800">
          <span className="font-heading text-3xl font-semibold tracking-wide">
           Campus Sphere
          </span>
        </div>

        <form  onSubmit={form.onSubmit(handleSubmit)} className="flex flex-col gap-4 [&_input]:placeholder-neutral-100 [&_.mantine-Input-input]:!border-white
         [&_.mantine-Input-input]:!border [&_input]:!text-white" >
             <SegmentedControl
                  color='#E75480' bg="none" 
                  className='[&_*]:!text-white border boder-white'
                  {...form.getInputProps('type')}
                  data={[
                    { label: 'Faculty', value: 'FACULTY' },
                    { label: 'Student', value: 'STUDENT' },
                    { label: 'Staff', value: 'STAFF' },
                  
                  ]}
                />
           <TextInput
            className='transition duration-300'
            leftSection={<IconId size={18}  style={{color:'white'}} />}
            placeholder="College id"
            radius="md"
            size="md"
            variant="unstyled"
              {...form.getInputProps('collegeId')}
          />  
           <TextInput
            className='transition duration-300'
            leftSection={<IconUserFilled size={18}  style={{color:'white'}} />}
            placeholder="Name"
            radius="md"
            size="md"
            variant="unstyled"
              {...form.getInputProps('Name')}
          />    
          <TextInput
            className='transition duration-300'
            leftSection={<IconMail size={18}  style={{color:'white'}} />}
            placeholder="Email address"
            radius="md"
            size="md"
            variant="unstyled"
              {...form.getInputProps('email')}
          />

          <PasswordInput
            className='transition duration-300'
            leftSection={<IconLock size={18} style={{color:'white'}} />}
            placeholder="Password"
            radius="md"
            size="md"
            variant="unstyled"
              {...form.getInputProps('password')}
          />
           <PasswordInput
            className='transition duration-300'
            leftSection={<IconLock size={18} style={{color:'white'}} />}
            placeholder="Confirm Password"
            radius="md"
            size="md"
            variant="unstyled"
              {...form.getInputProps('confirmPassword')}
          />

          <Button
            radius="md"
            size="md"
            color='pink'
            type='submit'
          >
        Register
          </Button> 
        </form>
        <div className='text-neutral-100 self-center text-sm'>
          Have an account? <Link to="/login" className="hover:underline">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage