- [ ] reset della password per utente non loggato
- [ ] per risposta si può usare [questo](https://ariakit.org/examples/dialog-react-router)
- [ ] capire come implementare l'upload di immagini e video e geolocazione
- [ ] aggiungere una loading animation nella registrazione e nel login
- [ ] fare una sezione per le notifiche
- [ ] provare a far usare la scrollbar del browser per la colonna centrale
- [ ] fare un sorting degli squeal loggato dal più interessante al meno interessante
  - in base alla data, quindi i più recenti in alto
  - se è un messaggio diretto, ha la priorità
  - se sono messaggi di canali che seguo, hanno la priorità
  - il tutto deve essere diluito non deve esserci un taglio netto
- [ ] capire come implementare il filtro sui destinatari
  - se sono in un messaggio diretto vedo solo il nome utente
  - se sono in un canale vedo il nome del canale
  - se cerco la keyword vedo solo la keyword
  - se sono nella visualizzazione generica vedo canali e keyword
- [ ] considerare di usare un sistema di generazione automatica di alt text per le immagini postate dagli utenti
- [ ] implementare la ricerca per keyword canali e menzioni nei messaggi
- add skeleteon loading

BACKEND:

NON AUTENTICATO:

- canali ufficiali squealer `GET /channels/?official=true`
- squeal di canali uffiali `GET /squeals/`

AUTENTENTICATO:

- canali ufficiali squealer `GET /channels/?official=true`
- canali a cui l'utente è iscritto `GET /channels/subscribed` (?)
- "canali" diretti, ovvero altri utenti `GET /channels/direct` (?)
- squeal di tutti i canali possibili (ufficiali, non ufficiali pubblici, non ufficiali privati e utenti) tranne da parte di canali privati a cui non sono iscritto `GET /squeals/`
- canali ufficiali mischiati con canali non ufficiali pubblici `GET /channels/?type=public`
- squeal di un canale specifico, anche di altri utenti `GET /channels/{channelName}o{username}/squeals` (?)

# User Route

`.get('/api/users/', listAllUsers)`

- roles: moderator
- jwt: required

`.get('/api/users/:username', findUser)`

- roles: moderator, user with same username, (smm che gestisce il canale dell'utente)?
- jwt: required

`.get('/api/users/:username/quota', getQuote)`

- roles: moderator, user with same username, (smm che gestisce il canale dell'utente)?
- jwt: required

`.delete('/api/users/:username', deleteUser)`

- roles: moderator, user with same username
- jwt: required

`.put('/api/users/:username', addUser)`

- roles: everyone
- jwt: not required

# Channel Route

`.get('/api/channels/:channelName?', escapeParam('channelName'), getChannels)`

`.get('/api/channels/:channelName/squeals', escapeParam('channelName'), getSqueals)`

- roles: everyone
- filter:
  - no jwt: only official channels
  - jwt: official/public channels + private channels where user is subscribed + (direct channels)?

`.post('/api/channels/', addChannel)`

- roles: unknown
- jwt: required

# Media Route

`.post('/api/media', upload.single('media'), uploadMedia)`

- roles: everyone
- jwt: required

`.get('/api/media/:id?', getMedia)`

- roles: everyone
- jwt: not required

# Squeal Route

`.get('/api/squeals/:id?', escapeQuery('channelName'), getSqueals)`

- roles: everyone
- filter:
  - no jwt: only official channels
  - jwt: official/public channels + private channels where user is subscribed + (direct channels)?

`.post('/api/squeals/', postSqueal)`

- roles: everyone
- jwt: required

`.delete('/api/squeals/:id', deleteSqueal)`

- roles: moderator, (user that posted the squeal)?
- jwt: required

`.patch('/api/squeals/:id', updateSqueal)`

- roles: everyone
- jwt: required (tranne per le visualizzazioni)?
