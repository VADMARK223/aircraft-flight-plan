/**
 * @author Markitanov Vadim
 * @since 25.01.2025
 */
export enum RouteType {
	ROUTINE_MAINTENANCE = 0,
	DEFAULT = 1,
	URGENT = 2
}

export const RouteTypeNames: Record<RouteType, string> = {
	[RouteType.ROUTINE_MAINTENANCE]: 'FERRY',
	[RouteType.DEFAULT]: 'LIVE',
	[RouteType.URGENT]: 'CHARTER'
}

export const isMaintenance = (routeTypeId: number): boolean => {
	return routeTypeId === RouteType.ROUTINE_MAINTENANCE
}
