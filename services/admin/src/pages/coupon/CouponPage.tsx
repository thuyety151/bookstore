import { Grid } from "@material-ui/core"
import { useState } from "react";
import CouponTable from "./components/CouponTable";

const CouponsPage: React.FC = () => {
    const [modelEdit, setModelEdit] = useState(null);
    return (
        <div>
            <Grid container justifyContent="space-around">
                <Grid item xs={7}>
                <CouponTable setModelEdit={setModelEdit} />
                </Grid>

                <Grid item xs={5}>

                </Grid>
                
            </Grid>
        </div>
    )
}

export default CouponsPage;