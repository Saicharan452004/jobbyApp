import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const filtersGroup = props => {
  const {onChangeCheckboxInputs, onChangeRadioInput} = props

  const onChangeCheckboxEvent = event => {
    onChangeCheckboxInputs(event)
  }

  const onChangeRadioEvent = event => {
    onChangeRadioInput(event)
  }

  const onGetCheckboxItems = () => (
    <ul className="checkboxes-container">
      {employmentTypesList.map(eachEmployee => (
        <li className="filters-group-list" key={eachEmployee.employmentTypeId}>
          <input
            type="checkbox"
            className="checkbox"
            id={eachEmployee.employmentTypeId}
            onChange={onChangeCheckboxEvent}
          />
          <label
            className="filters-group-label"
            htmlFor={eachEmployee.employmentTypeId}
          >
            {eachEmployee.label}
          </label>
        </li>
      ))}
    </ul>
  )

  const onGetRadioItems = () => (
    <ul className="radio-items-container">
      {salaryRangesList.map(eachSalary => (
        <li className="filters-group-list" key={eachSalary.salaryRangeId}>
          <input
            type="radio"
            className="radio"
            id={eachSalary.salaryRangeId}
            name="option"
            onChange={onChangeRadioEvent}
          />
          <label
            className="filters-group-label"
            htmlFor={eachSalary.salaryRangeId}
          >
            {eachSalary.label}
          </label>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="filters-group-container">
      <h1 className="filters-group-heading">Type of Employment</h1>
      {onGetCheckboxItems()}
      <hr className="hr-line" />
      <h1 className="filters-group-heading">Salary Range</h1>
      {onGetRadioItems()}
    </div>
  )
}
export default filtersGroup
