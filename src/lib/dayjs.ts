import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/uk'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('uk')

export default dayjs
