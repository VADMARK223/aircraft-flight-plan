/**
 * @author Markitanov Vadim
 * @since 02.12.2023
 */
import ky from 'ky'

const BASE_API_URL:string=`${process.env.REACT_APP_BASE_API_URL || 'http://localhost:8080'}/api/v1`

export const commonApi = ky.create({
    prefixUrl: BASE_API_URL
})