.PHONY: all backend backend-matchmaking frontend clean

all: backend backend-matchmaking frontend

backend:
	$(MAKE) -C backend rund

backend-matchmaking:
	$(MAKE) -C backend/match_making rund

frontend:
	$(MAKE) -C frontend rund

stop:
	$(MAKE) -C backend stop	
	$(MAKE) -C backend/match_making stop
	$(MAKE) -C frontend stop


clean:
	$(MAKE) -C backend clean
	$(MAKE) -C backend/match_making clean
	$(MAKE) -C frontend clean