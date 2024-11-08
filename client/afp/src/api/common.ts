/**
 * @author Markitanov Vadim
 * @since 02.12.2023
 */
import ky from 'ky'

const BASE_API_URL:string='http://localhost:8080'

export const commonApi = ky.create({
    prefixUrl: BASE_API_URL
})