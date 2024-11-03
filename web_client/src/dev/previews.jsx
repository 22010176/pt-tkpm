import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import App from "../pages";
import ThemNhapKho from "../pages/NhapXuatPage/themNhapKho";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/ComponentPreviews">
                <ComponentPreviews/>
            </ComponentPreview>
          <ComponentPreview path="/ThemNhapKho">
            <ThemNhapKho/>
          </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews