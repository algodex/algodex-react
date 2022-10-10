/**
 * Algodex API Interface
 *
 * Includes all responses from the publicly exposed routes
 *
 * TODO: Make deterministic in @algodex/sdk or @algodex/common.
 * Refactor the api client to accept a URL. The consumers of the api client should handle their
 * own ENV variables. For this project it would be ./hooks/useAlgodex
 *
 * @author Alexander Trefonas
 * @author Michael Feher
 * @copyright Algodev Inc
 */

import axios from 'axios'

// TODO: Implement getLogger() from '@algodex/common'

/**
 * Fetch Blog Posts
 * @returns {Promise<*>}
 */
export async function fetchBlogPosts() {
  const res = await axios.get('https://about.algodex.com/wp-json/wp/v2/posts')
  return res.data
}

/**
 * Fetch Blog Media
 * @param {number} id
 * @returns {Promise<*>}
 */
export async function fetchBlogMedia(id) {
  const res = await axios.get(`https://about.algodex.com/wp-json/wp/v2/media/${id}`)
  return res.data
}

/**
 * Add Email to the subscription mailing list on hubspot
 *
 * @returns {Promise<Object>}
 */
export const submitHubspotForm = async ({ payload, formId }) => {
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.NEXT_PUBLIC_PORTAL_ID}/${formId}`
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const response = await axios
    .post(url, payload, config)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error
    })

  return response
}

export const uploadSupportFile = async (payload) => {
  const url = '/support/upload'
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }

  var fileOptions = {
    access: 'PUBLIC_INDEXABLE',
    ttl: 'P6M',
    overwrite: false,
    duplicateValidationStrategy: 'NONE',
    duplicateValidationScope: 'ENTIRE_PORTAL'
  }

  payload.append('options', JSON.stringify(fileOptions))
  payload.append('folderPath', 'attachments')
  const response = await axios
    .post(url, payload, config)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error
    })
  return response
}

/**
 * Create an Hubspot engagement from file upload
 * @param {*} param0
 * @returns
 */
export const createEngagement = async (ticketId, fileId) => {
  const url = `/support/engagement`
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const payload = {
    engagement: {
      active: true,
      ownerId: 1,
      type: 'NOTE',
      timestamp: 1409172644778
    },
    associations: {
      contactIds: [],
      companyIds: [],
      dealIds: [],
      ownerIds: [],
      ticketIds: [ticketId]
    },
    attachments: [{ id: fileId }],
    metadata: { body: 'Attachment' }
  }

  const response = await axios
    .post(url, payload, config)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error
    })

  return response
}

/**
 * Create an Hubspot ticket
 * @param {*} param0
 * @returns
 */
export const createTicket = async (payload) => {
  const url = `/support/ticket`
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const response = await axios
    .post(url, payload, config)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error
    })
  return response
}
