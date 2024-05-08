import {
    Table,
    Column,
    Model,
    DataType,
} from "sequelize-typescript";

@Table
class Evacuation extends Model {
    @Column(DataType.STRING(128))
    name: string;

    @Column(DataType.FLOAT)
    latitude: string;

    @Column(DataType.FLOAT)
    longitude: string;
}

export default Evacuation;
