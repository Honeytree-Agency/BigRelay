# The BigRelay ActivityPub Relay Server
Powering BigRelay.social this is a fast and modern ActivityPub relay server written in Golang that allows you to federate your server with the decentralized social network. The BigRelay server forwards public activities from your server to other subscribed federated servers, and also receive and distribute public activities from other federated servers to your server.

A powerful GUI  backend makes it more convenient and easier to administer the server.  Advanced features are being developed that include enhanced moderation.

# Big Relay workflow

Server opts in – An admin adds the relay’s URL to their config.
Public posts sent – Every public ActivityPub status the server produces is forwarded to the relay.
Fan-out – The relay relays (literally) those posts to all other participating servers.
Local timelines fill – Users immediately see diverse content and can follow or interact directly, after which the servers begin federating peer-to-peer as usual.

# Key Benefits for Admins
Accelerates onboarding for new communities—users see an active global timeline right away.
Boosts discovery of interesting accounts across different platforms and languages.
Reduces manual admin work—one config line instead of curating allow-lists.
Opt-out friendly—if a relay becomes noisy or irrelevant, simply remove its URL and your server detaches.

Created and authored by Honeytree Technologies.
