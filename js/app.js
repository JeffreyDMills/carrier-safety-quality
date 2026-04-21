/* =========================================================================
   App shell + router
   ========================================================================= */

(function () {
  const { useState } = React;
  const { SideNav, TopHeader, KPIStrip } = window.SQ_UI;

  function App() {
    const [route, setRoute] = useState('exec');

    const Screen = {
      exec:        window.SQ_SCREENS.Executive,
      foundation:  window.SQ_SCREENS.DataFoundation,
      populations: window.SQ_SCREENS.Populations,
      patterns:    window.SQ_SCREENS.Patterns,
      rca:         window.SQ_SCREENS.RootCause,
      field:       window.SQ_SCREENS.FieldExposure,
      alerts:      window.SQ_SCREENS.Alerts,
    }[route] || window.SQ_SCREENS.Executive;

    return (
      <div className="min-h-screen flex">
        <SideNav current={route} onNav={setRoute} />
        <div className="flex-1 flex flex-col min-w-0">
          <TopHeader />
          <KPIStrip />
          <main className="flex-1 overflow-y-auto">
            <div className="px-7 py-6">
              <Screen onNav={setRoute} />
            </div>
          </main>
          <footer className="px-7 py-3 hairline-t bg-white text-[11px] text-slate-400 flex items-center justify-between">
            <div>Carrier · Product Safety & Quality Intelligence — art-of-the-possible prototype</div>
            <div>Build {new Date().toISOString().slice(0,10)} · Demo data only</div>
          </footer>
        </div>
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
})();
