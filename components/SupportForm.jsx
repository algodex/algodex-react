import React, { useState } from 'react'
import styled from '@emotion/styled'
import toast from 'react-hot-toast'

// Custom Styled Components
import Button from 'components/Button'
import Spinner from 'components/Spinner'
import { submitHubspotForm } from '@/services/algodex'

const SupportWrapper = styled.div`
  margin-top: 15vh;
  margin-bottom: 10vh;
  background-color: ${({ theme }) => theme.palette.gray[700]};
  box-shadow: 0 2px 4px rgba(14, 86, 124, 0.17);
  border-radius: 5px;
  overflow: hidden;
  .bg-grey {
    background-color: ${({ theme }) => theme.palette.gray[300]};
  }
`
const Form = styled.form`
  .form-control {
    min-height: 2.3rem;
    width: 100%;
    color: ${({ theme }) => theme.palette.gray[800]};
    background-color: ${({ theme }) => theme.palette.gray[300]};
    border-radius: 0.19rem;
    font-size: 1rem;
    padding: 0.5rem;
    font-weight: 600;
    outline: none;
    border: none;
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.palette.gray[400]};
    }
    &::placeholder {
      color: ${({ theme }) => theme.palette.gray[500]};
      font-size: 1rem;
    }
  }
  textarea.form-control {
    min-height: 6.3rem;
  }
`

const SubmitButton = styled(Button)`
  color: ${({ theme }) => theme.palette.gray[100]};
  text-decoration: uppercase;
  background-color: ${({ theme }) => theme.palette.green[600]};
`
const Title = styled.p`
  font-weight: 700;
  color: ${({ theme }) => theme.palette.gray[800]};
  font-size: 1.2rem;
  margin-bottom: 1rem;
`
const Label = styled.label`
  cursor: pointer;
  display: block;
  color: ${({ theme }) => theme.palette.gray[800]};
  font-weight: 500;
  display: flex;
  margin-bottom: 0.7rem;
  input[type='radio'] {
    appearance: none;
    background-color: transparent;
    margin-block: 0;
    font: inherit;
    width: 1.1em;
    height: 1.1em;
    border: 2px solid;
    border-radius: 50%;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;
    &::before {
      content: '';
      width: 0.65em;
      height: 0.65em;
      border-radius: 50%;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
    }
    &:checked::before {
      transform: scale(1);
    }
    &:checked {
      border: 4px solid;
      border-color: ${({ theme }) => theme.palette.gray[800]};
    }
    &:focus {
      outline: max(1px, 0.1em) solid;
      outline-color: ${({ theme }) => theme.palette.gray[800]};
      outline-offset: max(1px, 0.1em);
    }
  }
`
export const SupportForm = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    product: '',
    subject: '',
    detail: '',
    transactionId: '',
    messageType: 'new-feature',
    expectedFunctionality: '',
    upload: ''
  })
  const {
    email,
    firstName,
    lastName,
    product,
    subject,
    detail,
    messageType,
    transactionId,
    expectedFunctionality,
    upload
  } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const onSubmit = async (e) => {
    e.preventDefault()
    const ticketDescription = `messageType: ${messageType},\nfirstName: ${firstName},\nlastName: ${lastName},\nproduct: ${product},\nsubject: ${subject},\ndetail: ${detail}, \n${
      messageType == 'bug' &&
      `transactionId: ${transactionId}, \n expectedFunctionality: ${expectedFunctionality}`
    }`
    const fileSize = (upload.size / 1024).toFixed(2)

    if (fileSize > 100) {
      toast.error(`Uploaded file ${fileSize}kb exceeds maximum allowed size of 100kb`)
      return
    }
    const hs_file_upload = await toBase64(upload)

    const payload = {
      fields: [
        {
          objectTypeId: '0-1',
          name: 'Email',
          value: email
        },
        {
          objectTypeId: '0-1',
          name: 'TICKET.subject',
          value: `Algodex Support Ticket <${new Date()}>`
        },
        {
          objectTypeId: '0-1',
          name: 'TICKET.content',
          value: ticketDescription
        },
        {
          objectTypeId: '0-1',
          name: 'TICKET.hs_file_upload',
          value: hs_file_upload
        }
      ]
    }
    const formId = process.env.NEXT_PUBLIC_SUPPORT_FORM_ID
    if (email && subject && detail) {
      setLoading(true)
      const res = await submitHubspotForm({ payload, formId })
      setLoading(false)
      if (res instanceof Error) {
        const error =
          res.response?.data?.errors[0]?.errorType == 'INVALID_EMAIL'
            ? 'Invalid Email Address'
            : 'Sorry, an error occurred'
        toast.error(error)
      } else {
        toast.success(res.inlineMessage)
        // setEmail('')
      }
    } else {
      toast.success(
        'Please fill all the required fields, this will help us handle your request appropriately'
      )
    }
  }
  return (
    <section className="pb-1">
      <SupportWrapper className="w-6/6 mx-4 lg:w-5/6 lg:mx-auto ">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/3 bg-grey p-7">
            <Title className="md:mt-9">Kindly select the type of support you need</Title>
            <Label htmlFor="messageType1">
              <input
                type="radio"
                checked={messageType == 'new-feature'}
                onChange={(e) => onChange(e)}
                className="mr-3"
                id="messageType1"
                name="messageType"
                value="new-feature"
              />
              Feature request
            </Label>
            <Label htmlFor="messageType2">
              <input
                type="radio"
                checked={messageType == 'bug'}
                onChange={(e) => onChange(e)}
                className="mr-3"
                id="messageType2"
                name="messageType"
                value="bug"
              />
              Issue and bug report
            </Label>
          </div>
          <div className="w-full md:w-2/3">
            <Form className="px-7 py-10" onSubmit={onSubmit}>
              <div className="flex flex-wrap">
                <div className="mb-4 px-2 w-full md:w-1/2">
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => onChange(e)}
                    className="form-control"
                  />
                </div>
                <div className="mb-4 px-2 w-full md:w-1/2">
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => onChange(e)}
                    className="form-control"
                  />
                </div>
                <div className="mb-4 px-2 w-full">
                  <input
                    type="email"
                    placeholder="Email Address*"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-4 px-2 w-full md:w-1/2">
                  <input
                    type="text"
                    placeholder="Subject*"
                    name="subject"
                    value={subject}
                    onChange={(e) => onChange(e)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-4 px-2 w-full md:w-1/2">
                  <select
                    name="product"
                    value={product}
                    onChange={(e) => onChange(e)}
                    className="form-control"
                  >
                    <option value="">Select product</option>
                    <option value="Algodex">Algodex</option>
                    <option value="Mailbox">Mailbox</option>
                  </select>
                </div>
                <div className="mb-4 px-2 w-full">
                  <textarea
                    required
                    cols="4"
                    placeholder={
                      messageType == 'bug'
                        ? 'Enter issue description and steps to reproduce*'
                        : 'Enter details of feature request*'
                    }
                    name="detail"
                    value={detail}
                    onChange={(e) => onChange(e)}
                    className="form-control"
                  ></textarea>
                </div>
                {messageType == 'bug' && (
                  <>
                    <div className="mb-4 px-2 w-full">
                      <textarea
                        cols="4"
                        placeholder="Enter expected functionality"
                        name="expectedFunctionality"
                        value={expectedFunctionality}
                        onChange={(e) => onChange(e)}
                        className="form-control"
                      ></textarea>
                    </div>

                    <div className="mb-4 px-2 w-full md:w-1/2 mt-auto">
                      <input
                        type="text"
                        placeholder="Transaction ID"
                        name="transactionId"
                        value={transactionId}
                        onChange={(e) => onChange(e)}
                        className="form-control"
                      />
                    </div>

                    <div className="mb-4 px-2 w-full md:w-1/2">
                      <Label className="text-white">Upload a screenshot or video</Label>
                      <input
                        type="file"
                        placeholder="Upload"
                        name="upload"
                        onChange={(e) => {
                          setFormData({ ...formData, [e.target.name]: e.target.files[0] })
                        }}
                        className="form-control"
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="text-end mt-5">
                <SubmitButton type="submit" disabled={loading}>
                  Submit
                  {loading && (
                    <span className="ml-2">
                      <Spinner size={1} color={'white'} />
                    </span>
                  )}
                </SubmitButton>
              </div>
            </Form>
          </div>
        </div>
      </SupportWrapper>
    </section>
  )
}
