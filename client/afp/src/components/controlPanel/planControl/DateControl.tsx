/**
 * Компонент контроля диапозона дат обображения полетов
 *
 * @author Markitanov Vadim
 * @since 04.12.2023
 */
import React, { JSX, useEffect, useState } from 'react'
import { DatePicker, Space } from 'antd'
import dayjs from 'dayjs'
import type { RangeValueType } from 'rc-picker/lib/PickerInput/RangePicker'
import { DATE_FORMAT } from '../../../utils/consts'
import { $datesRange, updateDatesRangeFx } from '../../../store/date'
import { useStore } from 'effector-react'
import { CheckboxOptionType, Radio } from 'antd/lib'

enum DateControlMode {
  TODAY_TOMORROW,
  TODAY,
  TOMORROW,
  CUSTOM
}

const defaultDateControlMode = DateControlMode.TODAY_TOMORROW

const DateControl = (): JSX.Element => {
  const datesRange = useStore($datesRange)
  const [dateControlMode, setDateControlMode] = useState<DateControlMode>(defaultDateControlMode)

  useEffect(() => {
    switch (dateControlMode) {
      case DateControlMode.TODAY_TOMORROW:
        setDateChange([dayjs(), dayjs().add(1, 'days')])
        break
      case DateControlMode.TODAY:
        setDateChange([dayjs(), dayjs()])
        break
      case DateControlMode.TOMORROW:
        setDateChange([dayjs().add(1, 'days'), dayjs().add(1, 'days')])
        break
    }
  }, [dateControlMode])

  useEffect(() => {
    const startDate = datesRange[0]
    const finishDate = datesRange[1]
    const isToday = dayjs().isSame(startDate, 'day') && dayjs().isSame(finishDate, 'day')
    const isTodayTomorrow = dayjs().isSame(startDate, 'day') && dayjs().add(1, 'days').isSame(finishDate, 'day')
    const isTomorrow = dayjs().add(1, 'days').isSame(startDate, 'day') && dayjs().add(1, 'days').isSame(finishDate, 'day')
    if (isToday) {
      setDateControlMode(DateControlMode.TODAY)
    } else if (isTodayTomorrow) {
      setDateControlMode(DateControlMode.TODAY_TOMORROW)
    } else if (isTomorrow) {
      setDateControlMode(DateControlMode.TOMORROW)
    } else {
      setDateControlMode(DateControlMode.CUSTOM)
    }
  }, [datesRange])

  const setDateChange = (values: RangeValueType<dayjs.Dayjs> | null): void => {
    if (values && values[0] && values[1]) {
      updateDatesRangeFx([values[0].startOf('day'), values[1].startOf('day')])
    }
  }

  const dateControlModeOptions: CheckboxOptionType[] = [
    { label: 'Сегодня-завтра', value: DateControlMode.TODAY_TOMORROW },
    { label: 'Сегодня', value: DateControlMode.TODAY },
    { label: 'Завтра', value: DateControlMode.TOMORROW },
    { label: 'Пользовательская', value: DateControlMode.CUSTOM, disabled: true }
  ]

  return (
    <Space>
      <span>Диапозон дат:</span>
      <DatePicker.RangePicker value={datesRange}
                              onChange={setDateChange}
                              style={{ minWidth: '300px' }}
                              format={DATE_FORMAT}
                              picker={'date'}
                              allowClear={false}
      />
      <Radio.Group
        options={dateControlModeOptions}
        value={dateControlMode}
        onChange={(e) => setDateControlMode(e.target.value)}
        optionType={'button'}
        buttonStyle={'solid'}
      />
    </Space>
  )
}

export default DateControl