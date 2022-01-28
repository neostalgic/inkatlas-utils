module InkTextureSample
import Codeware.Localization.*
import Codeware.UI.*

public class Textures extends inkCustomController {
	protected let m_root: wref<inkFlex>;
	protected let m_container: wref<inkCanvas>;
	protected let m_buttonHints: wref<ButtonHintsEx>;
	protected let m_translator: wref<LocalizationSystem>;
	protected let m_areaSize: Vector2;

	protected cb func OnCreate() -> Void {
		let panel: ref<inkFlex> = new inkFlex();
		panel.SetName(n"panel");
		panel.SetAnchor(inkEAnchor.Fill);

		let rows: ref<inkVerticalPanel> = new inkVerticalPanel();
		rows.Reparent(panel);

		let background: ref<inkRectangle> = new inkRectangle();
		background.SetAnchor(inkEAnchor.Fill);
		background.SetMargin(new inkMargin(8.0, 8.0, 8.0, 8.0));
		background.SetTintColor(ThemeColors.PureBlack());
		background.SetOpacity(0.217);
		background.Reparent(panel);

        //ReplaceMe//

		let container: ref<inkCanvas> = new inkCanvas();
		container.SetName(n"container");
		container.SetAnchor(inkEAnchor.Fill);
		container.Reparent(panel);

		this.SetRootWidget(panel);
		this.SetContainerWidget(container);
	}

	public func GetContainer() -> wref<inkCanvas> {
		return this.m_container;
	}

	public func GetHints() -> wref<ButtonHintsEx> {
		return this.m_buttonHints;
	}

	public func GetTranslator() -> wref<LocalizationSystem> {
		return this.m_translator;
	}

	public func GetSize() -> Vector2 {
		return this.m_areaSize;
	}

	public func SetSize(areaSize: Vector2) -> Void {
		this.m_areaSize = areaSize;
	}

	public func SetHints(buttonHints: wref<ButtonHintsEx>) -> Void {
		this.m_buttonHints = buttonHints;
	}

	public func SetTranslator(localization: wref<LocalizationSystem>) -> Void {
		this.m_translator = localization;
	}

	public static func Create() -> ref<Textures> {
		let self: ref<Textures> = new Textures();
		self.CreateInstance();

		return self;
	}
}