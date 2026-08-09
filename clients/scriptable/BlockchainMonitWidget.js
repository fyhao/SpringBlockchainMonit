// Scriptable iOS widget. Set the base URL in the script parameter.
const baseUrl = (args.widgetParameter || 'https://YOUR-APP.example').replace(/\/$/, '');

async function loadTokens() {
  const request = new Request(`${baseUrl}/api/tokenlist`);
  request.timeoutInterval = 15;
  return request.loadJSON();
}

function render(tokens) {
  const widget = new ListWidget();
  widget.backgroundColor = new Color('#0c4237');
  const title = widget.addText('Blockchain Monit');
  title.textColor = Color.white();
  title.font = Font.boldSystemFont(14);
  widget.addSpacer(6);
  tokens.slice(0, config.widgetFamily === 'large' ? 8 : 3).forEach(token => {
    const row = widget.addStack();
    const name = row.addText(`${token.name} · ${token.network}`);
    name.textColor = new Color('#c7ff9b');
    name.font = Font.systemFont(11);
    row.addSpacer();
    const price = row.addText(token.price);
    price.textColor = Color.white();
    price.font = Font.mediumSystemFont(11);
  });
  widget.url = baseUrl;
  return widget;
}

try {
  const widget = render(await loadTokens());
  Script.setWidget(widget);
  if (!config.runsInWidget) await widget.presentMedium();
} catch (error) {
  const widget = new ListWidget();
  widget.addText('Blockchain Monit unavailable');
  widget.addText(String(error));
  Script.setWidget(widget);
}
Script.complete();
