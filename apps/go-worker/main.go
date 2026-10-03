package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

type WorkerTelemetry struct {
	Service   string `json:"service"`
	Engine    string `json:"engine"`
	Status    string `json:"status"`
	Timestamp string `json:"timestamp"`
	ThroughputTPS int `json:"throughputTPS"`
}

func telemetryHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	resp := WorkerTelemetry{
		Service:       "DEVGYAN INNOVATION High-Speed Telemetry Worker",
		Engine:        "Go Lang 1.22",
		Status:        "Active & Listening",
		Timestamp:     time.Now().UTC().Format(time.RFC3339),
		ThroughputTPS: 450,
	}

	json.NewEncoder(w).Encode(resp)
}

func main() {
	http.HandleFunc("/telemetry", telemetryHandler)
	port := ":5000"
	fmt.Printf("[DEVGYAN INNOVATION Worker] Go Service running on port %s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatalf("Go Worker failed: %v", err)
	}
}
