#!/bin/bash

taguid=$1

if [ ${#1} -eq 18 ]; then # Check if user provided a long UID
taguid1="$(echo $taguid | cut -b3,4)"   # Byte 1 (we count from 0)
taguid2="$(echo $taguid | cut -b5,6)"   # Byte 2
taguid3="$(echo $taguid | cut -b9,10)"  # Byte 4
taguid4="$(echo $taguid | cut -b11,12)" # Byte 5
taguid5="$(echo $taguid | cut -b13,14)" # Byte 6
taguid6="$(echo $taguid | cut -b15,16)" # Byte 7

elif [ ${#1} -eq 14 ]; then # Check if user provided a short UID
taguid1="$(echo $taguid | cut -b3,4)"   # Byte 1 (we count from 0)
taguid2="$(echo $taguid | cut -b5,6)"   # Byte 2
taguid3="$(echo $taguid | cut -b7,8)"   # Byte 3
taguid4="$(echo $taguid | cut -b9,10)"  # Byte 4
taguid5="$(echo $taguid | cut -b11,12)" # Byte 5
taguid6="$(echo $taguid | cut -b13,14)" # Byte 6

else
	echo "Usage:          $0 UID"
	echo
	echo "Examples:"
	echo "with short UID: $0 0471622AE33E81"
	echo "with long UID:  $0 0471629F2AE33E8176"
	exit
fi

pw1="$(printf '%02X\n' $(( 0xAA ^ 0x$taguid1 ^ 0x$taguid3 )))"
pw2="$(printf '%02X\n' $(( 0x55 ^ 0x$taguid2 ^ 0x$taguid4 )))"
pw3="$(printf '%02X\n' $(( 0xAA ^ 0x$taguid3 ^ 0x$taguid5 )))"
pw4="$(printf '%02X\n' $(( 0x55 ^ 0x$taguid4 ^ 0x$taguid6 )))"

echo $pw1$pw2$pw3$pw4
