package vadmark.afp.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import vadmark.afp.entity.DictAircraftType
import vadmark.afp.entity.DictRouteType

@Repository
interface DictRouteTypeRepository : JpaRepository<DictRouteType, Int> {
}
