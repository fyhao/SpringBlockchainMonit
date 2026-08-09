/**
 * JSBox workflow action. Configure endpoint in the action input or directly below.
 * Compatible with direct JSBox execution and jsbox-wf action invocation.
 */
const DEFAULT_ENDPOINT = 'https://YOUR-APP.example/api/tokenlist';

function formatTokens(tokens) {
  return tokens.map(token => `${token.name} (${token.network}): ${token.price}`).join('\n');
}

function run(input) {
  const endpoint = (input && input.endpoint) || DEFAULT_ENDPOINT;
  return new Promise((resolve, reject) => {
    $http.get({
      url: endpoint,
      timeout: 15,
      handler: response => {
        if (response.error) return reject(response.error);
        const output = formatTokens(response.data || []);
        if (typeof $ui !== 'undefined') $ui.alert({ title: 'Blockchain Monit', message: output || 'No token data' });
        resolve(output);
      }
    });
  });
}

if (typeof module !== 'undefined') module.exports = { run, formatTokens };
if (typeof $addin !== 'undefined' && $addin.run) $addin.run(run);
else if (typeof $app !== 'undefined') run({});
