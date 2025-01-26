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

#define nFrames 1000


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

    char *finger_names[5] = {"thumb", "index", "middle", "ring", "pinky"};

    // Digits (fingers)
    for (int d = 0; d < 1; d++) {
        const LEAP_DIGIT* digit = &hand->digits[d];
        printf("  Finger %d (%s) ID: %d, Extended: %s\n", d, finger_names[d], digit->finger_id, digit->is_extended ? "Yes" : "No");

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


void createLog(FILE* log, const LEAP_HAND* hand, const int64_t index, char letter, const uint32_t nHands) {
    //FILE* log;
    //log = fopen("../output/log.csv", "w");

//    if (log == NULL) {
//        printf("FILE NOT OPENED, exiting");
//        exit(0);
//    }
//    else {printf("FILE OPENED SUCCEFULLY");}

    char *header = "key,letter,nHands,palmX,palmY,palmZ,palm_dir,palm_orient,"
                   "arm_prev_joint,arm_next_joint, arm_rotation,"
                   "pinch_dist,pinch_str,grab_angle,grab_strength,"

                   "thumb_extended,thumb_prev_joint,thumb_nex_joint,thumb_rotation,"
                   "index_extended,index_prev_joint,index_nex_joint,index_rotation,"
                   "middle_extended,middle_prev_joint,middle_nex_joint,middle_rotation,"
                   "ring_extended,ring_prev_joint,ring_nex_joint,ring_rotation,"
                   "pinky_extended,pinky_prev_joint,pinky_nex_joint,pinky_rotation";

    fprintf(log,"%s", header);

    for (int n = 0; n < nHands; n++) {
        fputc('\n', log);
        fprintf(log, "%lld,%c,%u,%f,%f,%f,%f,%f,%f,%f,%f,%f,%f"
                     "%f,%f,%f,%f,%f,%f,%f,%f,%f,%f"
                     "%f,%f,%f,%f"
                     ,

                index, toupper(letter), nHands, hand->palm.position.x, hand->palm.position.y, hand->palm.position.z,                         //first line from header
                hand->palm.direction.x, hand->palm.direction.y, hand->palm.direction.z,                                     //first line from header
                hand->palm.orientation.x, hand->palm.orientation.y, hand->palm.orientation.z, hand->palm.orientation.w,     //first line from header
                hand->arm.prev_joint.x,hand->arm.prev_joint.x,hand->arm.prev_joint.x,                                       //second line from header
                hand->arm.next_joint.x,hand->arm.next_joint.x,hand->arm.next_joint.x,                                       //second line from header
                hand->arm.rotation.x,hand->arm.rotation.y,hand->arm.rotation.z,hand->arm.rotation.w,                        //second line from header
                hand->pinch_distance,hand->pinch_strength,hand->grab_angle,hand->grab_strength                             //third line from header
                );

        for (int i = 0; i < 5; i++) {
            fprintf(log,"%u,%f,%f,%f,%f,%f,%f,%f,%f,%f,%f"          //thumb metacarpal
                        "%f,%f,%f,%f,%f,%f,%f,%f,%f,%f"             //thumb proximal
                        "%f,%f,%f,%f,%f,%f,%f,%f,%f,%f"             //thumb intermediate
                        "%f,%f,%f,%f,%f,%f,%f,%f,%f,%f"             //thumb distal
                    ,

                    hand->digits[i].is_extended,
                    hand->digits[i].metacarpal.prev_joint.x, hand->digits[i].metacarpal.prev_joint.y, hand->digits[i].metacarpal.prev_joint.z,
                    hand->digits[i].metacarpal.next_joint.x, hand->digits[i].metacarpal.next_joint.y, hand->digits[i].metacarpal.next_joint.z,
                    hand->digits[i].metacarpal.rotation.x, hand->digits[i].metacarpal.rotation.y, hand->digits[i].metacarpal.rotation.z, hand->digits[i].metacarpal.rotation.w,

                    hand->digits[i].proximal.prev_joint.x, hand->digits[i].proximal.prev_joint.y, hand->digits[i].proximal.prev_joint.z,
                    hand->digits[i].proximal.next_joint.x, hand->digits[i].proximal.next_joint.y, hand->digits[i].proximal.next_joint.z,
                    hand->digits[i].proximal.rotation.x, hand->digits[i].proximal.rotation.y, hand->digits[i].proximal.rotation.z, hand->digits[i].proximal.rotation.w,

                    hand->digits[i].intermediate.prev_joint.x, hand->digits[i].intermediate.prev_joint.y, hand->digits[i].intermediate.prev_joint.z,
                    hand->digits[i].intermediate.next_joint.x, hand->digits[i].intermediate.next_joint.y, hand->digits[i].intermediate.next_joint.z,
                    hand->digits[i].intermediate.rotation.x, hand->digits[i].intermediate.rotation.y, hand->digits[i].intermediate.rotation.z, hand->digits[i].proximal.rotation.w,

                    hand->digits[i].distal.prev_joint.x, hand->digits[i].distal.prev_joint.y, hand->digits[i].distal.prev_joint.z,
                    hand->digits[i].distal.next_joint.x, hand->digits[i].distal.next_joint.y, hand->digits[i].distal.next_joint.z,
                    hand->digits[i].distal.rotation.x, hand->digits[i].distal.rotation.y, hand->digits[i].distal.rotation.z, hand->digits[i].distal.rotation.w
                    );
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

    FILE* log;
    log = fopen("../output/log.csv", "w");

    if (log == NULL) {
        printf("FILE NOT OPENED, exiting");
        exit(0);
    }
    else {printf("FILE OPENED SUCCEFULLY\n");}

    int loop_cnt = 0;
    char target_letter;

    while (loop_cnt < 3) {

        //printf("How many frames of data?\n");
        //scanf("%d", &nFrames);
        printf("Which letter are you inputting in ASL?\n");
        Sleep(5000);

        if (loop_cnt == 0) {target_letter = 'A';}
        if (loop_cnt == 1) {target_letter = 'B';}
        if (loop_cnt == 2) {target_letter = 'C';}


        //scanf("%c", &target_letter);
        //printf("you entered %c", target_letter);

        //if (target_letter == '0') {break;}

        for (int curr_frame = 0; curr_frame < nFrames;) {
            printf("\n\n");
            //Sleep(1000);


            LEAP_TRACKING_EVENT *frame = GetFrame();
            if (frame && (frame->tracking_frame_id > lastFrameID)) {
                lastFrameID = frame->tracking_frame_id;
                printf("Frame %lli with %i hands.\n", (long long int) frame->tracking_frame_id, frame->nHands);
                for (uint32_t h = 0; h < frame->nHands; h++) {
                    LEAP_HAND *hand = &frame->pHands[h];
                    //printHandData(hand);
                    if (frame->nHands > 0) {
                        createLog(log, hand, frame->tracking_frame_id, target_letter, frame->nHands);
                        curr_frame++;
                    }
                }
            }
        } //ctrl-c to exit

        loop_cnt++;
    }
    fclose(log);
    return 0;
}
//End-of-Sample
