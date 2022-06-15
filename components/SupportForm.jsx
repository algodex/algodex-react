import React from 'react'
import styled from '@emotion/styled'

const SupportWrapper = styled.section`
  margin-top: 18vh;
  text-align: center;
  font-size: 1.3rem;
  a {
    color: ${({ theme }) => theme.palette.green[400]};
    font-weight: 500;
  }
`
export const SupportForm = () => {
  return (
    <SupportWrapper>
      Kindly leave a message for our support at{' '}
      <a href="mailTo:support@algodex.com">support@algodex.com </a>
    </SupportWrapper>
  )
}

// import React, { useState } from 'react'
// import styled from '@emotion/styled'

// const SupportWrapper = styled.section`
//   margin-top: 12vh;
//   background: white;
//   box-shadow: 0 2px 4px rgba(14, 86, 124, 0.17);
//   .bg-grey {
//     background-color: ${({ theme }) => theme.palette.gray[200]};
//   }
// `
// const Form = styled.form`
//   display: flex;
//   align-items: center;
//   position: relative;
//   flex-wrap: wrap;
//   input {
//     height: 2.3rem;
//     margin-right: 1rem;
//     flex: 1;
//     color: ${({ theme }) => theme.palette.gray[700]};
//     background-color: ${({ theme }) => theme.palette.gray[300]};
//     border: 2px solid;
//     border-color: ${({ theme }) => theme.palette.gray[600]};
//     border-radius: 0.19rem;
//     transition: all ease 0.3s;
//     font-size: 1rem;
//     &:focus {
//       outline: none;
//       border-color: ${({ theme }) => theme.palette.gray[400]};
//     }
//     &::placeholder {
//       color: ${({ theme }) => theme.palette.gray[600]};
//       font-size: 1rem;
//       font-weight: bold;
//       font-style: italic;
//     }
//   }
// `
// export const SupportForm = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   })
//   const { email, firstName, lastName, product, subject, detail } = formData

//   const onChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const onSubmit = async (e) => {
//     e.preventDefault()
//     console.log(formData)
//   }
//   return (
//     <SupportWrapper>
//       <div className="grid lg:grid-flow-col grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
//         <div className="col-span-2">
//           <Form className="p-7">
//             <input
//               type="email"
//               placeholder="Email Address"
//               name="email"
//               value={email}
//               onChange={(e) => onChange(e)}
//               className="form-control w-1/2"
//             />
//           </Form>
//         </div>
//         <div className="col-span-1 bg-grey"></div>
//       </div>
//     </SupportWrapper>
//   )
// }
