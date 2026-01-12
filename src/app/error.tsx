'use client'

import { Alert, Button } from "antd"
import "../app/styles/start.css"

export default function Error ({
  error,
  reset,  

}:{
    error: Error;
    reset:()=> void;
}) {
    return (
        <div className="error">
            <Alert
  type="error"
  showIcon
  title="An error occurred."
  description={error.message}
/>
            <Button
                onClick={()=>reset()}
                className="reset"> Try again
            </Button>
        </div>
    )
}
