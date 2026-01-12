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
                message={<strong>An error occurred.</strong>}
                description={error.message || 'Failed Network'}
/>
            <Button
                onClick={()=>reset()}
                className="reset"> Try again
            </Button>
        </div>
    )
}
