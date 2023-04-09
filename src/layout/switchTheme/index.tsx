import { useState } from 'react'
import { Switch } from 'antd';

function SwitchTheme() {
    const [themeSwitchValue, setThemeSwitchValue] = useState(false);
    return (
        <Switch
            checkedChildren={<>🌞</>}
            unCheckedChildren={<>🌜</>}
            checked={themeSwitchValue}
            onChange={(value: boolean) => setThemeSwitchValue(value)}
        />
    )
}
export default SwitchTheme