// main.go
package main

import (
	"encoding/json"
	"fmt"
	"os"
)

func main() {
	var input struct {
		A int `json:"a"`
		B int `json:"b"`
	}
	err := json.NewDecoder(os.Stdin).Decode(&input)
	if err != nil {
		fmt.Println("Error decoding input:", err)
		return
	}
	fmt.Println(input.A + input.B)
}