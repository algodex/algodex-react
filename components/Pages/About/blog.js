import React from 'react'
import { BlogWrapper } from './styles.css'
import Icon from '@mdi/react'
import { mdiCalendarBlank } from '@mdi/js'
import { Container } from '@/components/About/styles.css'

export const BlogPreview = () => {
  return (
    <Container className="container mx-auto">
      <BlogWrapper>
        <h3 className="text-gray-000 text-3xl font-weight-bold mb-12">
          Read our <span className="text-green-500">BLOG</span>
        </h3>
        <div className="lg:w-5/6 mx-auto bg-gray-000 md:flex">
          <div className="md:w-1/2">
            <img src="/medicine-3298451_1920.jpeg" alt="" className="w-100 h-full object-cover" />
          </div>
          <div className="update-container bg-gray-000 drop-shadow-lg md:w-1/2">
            <div className="p-8">
              <button className="btn-gray mb-6">Updates</button>
              <h2 className="mb-9 text-3xl text-gray-900 font-weight-bold">
                Algorand Partnership Announcement
              </h2>
              <p className="text-gray-800/70 mb-6">
                Algodev, Inc. – the company behind Algodex – is delighted to announce it is the
                latest recipient of an Algorand Foundation Grant. Algodex will deliver …
              </p>
              <p className="flex items-center text-sm text-gray-800/50">
                <span className="mr-1">
                  <Icon path={mdiCalendarBlank} title="Calendar" size={0.5} />
                </span>
                August 2, 2021
              </p>
            </div>
          </div>
        </div>
      </BlogWrapper>
    </Container>
  )
}
