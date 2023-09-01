import React, { ChangeEvent } from 'react'
import { Icon } from '@iconify/react'

//MUI components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// Custom Styled Components
import OutlinedInput from '@/components/Input/OutlinedInput'
import { styles } from '../styles.css'
import { ErrorMessage } from '../ErrorMessage'

export const EditableField = ({
  confirmEdit,
  handleEdit,
  cancelEdit,
  isEligible,
  isEdit,
  error,
  inputValue,
  inputName,
  tempInputValue,
  tempInputName,
  onChange,
  placeholder,
  additionalText
}: {
  confirmEdit: (inputName: string, inputValue: string | number) => void
  handleEdit: (e: { target: { name: string; value: string | number } }) => void
  cancelEdit: (inputName: string, inputValue: string | number) => void
  isEligible: boolean
  isEdit: string
  error: object
  inputValue: string | number
  inputName: string
  tempInputValue: string
  tempInputName: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  placeholder: string
  additionalText?: string
}) => {
  return (
    <Box sx={styles.fillAvailable}>
      {isEdit === tempInputName ? (
        <Box className="flex items-center">
          <OutlinedInput
            type="text"
            placeholder={placeholder}
            name={tempInputName}
            value={tempInputValue}
            onChange={(e) => onChange(e)}
            sx={{
              ...styles.input,
              borderTop: 0,
              borderInline: 0
            }}
          />
          <Icon
            icon="mdi:check-bold"
            className="ml-3 cursor-pointer text-white"
            onClick={() => confirmEdit(inputName, tempInputValue)}
          />
          <Icon
            icon="mdi:cancel-bold"
            className="ml-3 cursor-pointer text-white"
            onClick={() => cancelEdit(tempInputName, inputValue)}
          />
        </Box>
      ) : (
        <Typography className="flex items-center" sx={styles.value}>
          {inputValue} {additionalText}
          {isEligible && (
            <Icon
              icon="material-symbols:edit"
              className="ml-3 cursor-pointer"
              onClick={() =>
                handleEdit({
                  target: {
                    name: tempInputName,
                    value: inputValue
                  }
                })
              }
            />
          )}
        </Typography>
      )}
      <ErrorMessage error={error} name={tempInputName} />
    </Box>
  )
}
