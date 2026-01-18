'use client'

import { Alert, Button } from "antd"

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
                className="error p-[20px] mw-[800px] m-auto"> Try again
            </Button>
        </div>
    )
}
