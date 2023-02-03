import React from 'react'

export const DateTimePickers = ({
  name,
  value,
  onChange
}: {
  name: string
  value: string | number | readonly string[]
  onChange: (e: unknown) => void
}) => {
  //   const datePicker = document ? document.querySelector('-webkit-calendar-picker-indicator'):null

  //   const displayPicker = () => {
  // //     console.log(datePicker)
  //     // datePicker.click()
  //   }
  return (
    <>
      <input
        type="datetime-local"
        data-placeholder="yyyy-mm-dd-hh-mm-ss"
        required
        aria-required="true"
        //         onClick={displayPicker}
        name={name}
        value={value}
        onChange={onChange}
        // onFocus={this.type='date'}
        // onBlur="(this.type='text')"
      />
    </>
  )
}
