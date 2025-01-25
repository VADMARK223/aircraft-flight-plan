/**
 * @author Markitanov Vadim
 * @since 25.01.2025
 */
export interface HomeTableData {
	id: number | null
	regNumber: string
	scheduledArrivalDate: string
	scheduledDepartureDate: string
	type: number
	aptArrIata: string
	aptArrIcao: string
	aptArrName: string
	aptDeptIata: string
	aptDeptIcao: string
	aptDeptName: string
}
