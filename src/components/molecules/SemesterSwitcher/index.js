import React from 'react'

const SemesterSwitcher = ({ isMainPage, onSwitchSemester }) => {
  let input
  const option = ['2018-S', '2018-1', '2017-W', '2017-2', '2017-S', '2017-1']

  const onSubmit = () => {
    let newYear = input.value.substring(0, 4)
    let newSemester = input.value.substring(5, 6)
    switch (newSemester) {
      case '1':
        newSemester = '1학기'
        break
      case 'S':
        newSemester = '여름학기'
        break
      case '2':
        newSemester = '2학기'
        break
      case 'W':
        newSemester = '겨울학기'
        break
      default:
        console.log('switch semester failed')
        return
    }
    onSwitchSemester(newYear, newSemester)
  }

  if (isMainPage) {
    return (
      <div>
        <select ref={node => { input = node }} onChange={onSubmit}>
          {option.map(value =>
            <option
              key={value}
              value={value}
            >{value}</option>
          )}
        </select>
      </div>
    )
  }
  return null
}

export default SemesterSwitcher
