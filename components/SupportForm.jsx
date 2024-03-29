/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { useState, useCallback } from 'react'
import { createEngagement, createTicket, uploadSupportFile } from '@/services/cms'

// Custom Styled Components
import Button from 'components/Button'
import Spinner from 'components/Spinner'
import styled from '@emotion/styled'
import toast from 'react-hot-toast'

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

const initialValues = {
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
}

export const SupportForm = () => {
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState(initialValues)
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

  const sendFile = useCallback(async (file) => {
    const payload = new FormData()
    payload.append('file', file)
    const res = await uploadSupportFile(payload)

    if (res instanceof Error) {
      setLoading(false)
      toast.error('Sorry, an error occurred while uploading your file')
      return null
    } else {
      // return file metadata
      return res.objects
    }
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()

    // Check the file size before ticket creation
    let fileSize = 0
    if (formData.messageType === 'bug' && upload) {
      fileSize = (upload.size / 1024).toFixed(2)
      if (fileSize > 100) {
        toast.error(`Uploaded file ${fileSize}kb exceeds maximum allowed size of 100kb`)
        return
      }
    }

    const ticketDescription = `messageType: ${messageType},\nemail: ${email},\nfirstName: ${firstName},\nlastName: ${lastName},\nproduct: ${product},\nsubject: ${subject},\ndetail: ${detail}, \n${
      messageType == 'bug'
        ? `transactionId: ${transactionId}, \n expectedFunctionality: ${expectedFunctionality}`
        : ''
    }`

    // Ticket detail
    const payload = [
      {
        name: 'subject',
        value: `Algodex Support Ticket <${new Date()}>`
      },
      {
        name: 'content',
        value: ticketDescription
      },
      {
        name: 'hs_pipeline',
        value: 0
      },
      {
        name: 'hs_pipeline_stage',
        value: 1
      }
    ]

    if (!email && !subject && !detail) {
      toast.error(
        'Please fill all the required fields, this will help us handle your request appropriately'
      )
      return
    }
    // Show loading button
    setLoading(true)
    const ticketRes = await createTicket(payload)

    if (ticketRes instanceof Error) {
      setLoading(false)
      toast.error('There is an error while creating a ticket')
      return
    }

    if (formData.messageType === 'new-feature') {
      setLoading(false)
      toast.success('Thanks for submitting your request. Our team will get back to you!')

      // *it returns NodeList and it is not Array
      const eles = document.getElementsByName('upload')
      if (eles.length > 0) {
        eles[0].value = ''
      }
      setFormData(initialValues)
    } else {
      // upload can contain files or can be empty
      if (upload) {
        const fileRes = await sendFile(upload)
        if (fileRes === null) {
          // File is selected but there was an error in file uploading and it is handled
          return
        }

        const engaementRes =
          fileRes?.length > 0 ? await createEngagement(ticketRes.objectId, fileRes[0].id) : null

        setLoading(false)
        if (engaementRes instanceof Error || engaementRes === null) {
          toast.error('There is a problem in file uploading.')
        } else {
          toast.success('Thanks for submitting your request. Our team will get back to you!')
        }
      } else {
        setLoading(false)
        toast.success('Thanks for submitting your request. Our team will get back to you!')
      }

      // *it returns NodeList and it is not Array
      const eles = document.getElementsByName('upload')
      if (eles.length > 0) {
        eles[0].value = ''
      }
      setFormData({ ...initialValues, messageType: 'bug' })
    }
  }
  return (
    <section className="pb-1">
      <SupportWrapper className="w-6/6 mx-4 lg:w-5/6 lg:mx-auto ">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/3 bg-grey p-7">
            <Title className="md:mt-9 leading-6">Please select the type of support you need</Title>
            <Label htmlFor="messageType1">
              <input
                type="radio"
                checked={messageType == 'new-feature'}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                    expectedFunctionality: '',
                    transactionId: '',
                    upload: ''
                  })
                }}
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
                onChange={(e) => {
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }}
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
                    required
                    name="product"
                    value={product}
                    onChange={(e) => onChange(e)}
                    className="form-control"
                  >
                    <option value="">Select product*</option>
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
                        required
                        cols="4"
                        placeholder="Enter expected functionality*"
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
                        accept="image/*, video/*"
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
