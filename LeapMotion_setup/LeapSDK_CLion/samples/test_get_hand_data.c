/* Copyright (C) 2012-2017 Ultraleap Limited. All rights reserved.
 *
 * Use of this code is subject to the terms of the Ultraleap SDK agreement
 * available at https://central.leapmotion.com/agreements/SdkAgreement unless
 * Ultraleap has signed a separate license agreement with you or your
 * organisation.
 *
 */

#include <stdio.h>
#include <stdlib.h>

#ifdef _WIN32
#include <Windows.h>
#else
#include <unistd.h>
#endif

#include "LeapC.h"
#include "ExampleConnection.h"


void printHandData(const LEAP_HAND* hand) {
    // General hand data
    printf("Hand ID: %u (%s)\n", hand->id, hand->type == eLeapHandType_Left ? "Left" : "Right");
    printf("  Palm Position: (%f, %f, %f)\n", hand->palm.position.x, hand->palm.position.y, hand->palm.position.z);
    printf("  Confidence: %f\n", hand->confidence);
    printf("  Pinch Distance: %f\n", hand->pinch_distance);
    printf("  Pinch Strength: %f\n", hand->pinch_strength);
    printf("  Grab Strength: %f\n", hand->grab_strength);
    printf("  Grab Angle: %f\n", hand->grab_angle);
    printf("  Wrist Position: (%f, %f, %f)\n", hand->arm.prev_joint.x, hand->arm.prev_joint.y, hand->arm.prev_joint.z);
    printf("  Elbow Position: (%f, %f, %f)\n", hand->arm.next_joint.x, hand->arm.next_joint.y, hand->arm.next_joint.z);
    //printf("  Arm Direction: (%f, %f, %f)\n", hand->arm.direction.x, hand->arm.direction.y, hand->arm.direction.z);

    // Digits (fingers)
    for (int d = 0; d < 5; d++) {
        const LEAP_DIGIT* digit = &hand->digits[d];
        printf("  Finger %d ID: %d, Extended: %s\n", d, digit->finger_id, digit->is_extended ? "Yes" : "No");

        // Print bone data
        const LEAP_BONE* bones[] = { &digit->metacarpal, &digit->proximal, &digit->intermediate, &digit->distal };
        const char* boneNames[] = { "Metacarpal", "Proximal", "Intermediate", "Distal" };

        for (int b = 0; b < 4; b++) {
            const LEAP_BONE* bone = bones[b];
            printf("    %s Bone: Start (%f, %f, %f), End (%f, %f, %f), Width: %f\n",
                   boneNames[b],
                   bone->prev_joint.x, bone->prev_joint.y, bone->prev_joint.z,
                   bone->next_joint.x, bone->next_joint.y, bone->next_joint.z,
                   bone->width);
        }
    }
}


int64_t lastFrameID = 0; //The last frame received

int main(int argc, char** argv) {
    OpenConnection();
    while(!IsConnected)
        millisleep(100); //wait a bit to let the connection complete

    printf("Connected.");
    LEAP_DEVICE_INFO* deviceProps = GetDeviceProperties();
    if(deviceProps)
        printf("Using device %s.\n", deviceProps->serial);

    for(;;){
        printf("\n\n\n\n\n");
        Sleep(1000);
        LEAP_TRACKING_EVENT *frame = GetFrame();
        if(frame && (frame->tracking_frame_id > lastFrameID)){
            lastFrameID = frame->tracking_frame_id;
            printf("Frame %lli with %i hands.\n", (long long int)frame->tracking_frame_id, frame->nHands);
            for(uint32_t h = 0; h < frame->nHands; h++){
                LEAP_HAND* hand = &frame->pHands[h];
                printHandData(hand);
            }
        }
    } //ctrl-c to exit
    return 0;
}
//End-of-Sample
