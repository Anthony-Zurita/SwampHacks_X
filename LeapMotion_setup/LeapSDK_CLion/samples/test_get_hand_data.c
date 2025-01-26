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
#define LOG_PATH "../output/log_abc3.csv"


void printHandData(const LEAP_HAND* hand) {
    // General hand data
    printf("Hand ID: %u (%s)\n", hand->id, hand->type == eLeapHandType_Left ? "Left" : "Right");
//    printf("  Palm Position: (%f, %f, %f)\n", hand->palm.position.x, hand->palm.position.y, hand->palm.position.z);
    printf("  Palm Direction: (%f, %f, %f)\n", hand->palm.direction.x, hand->palm.direction.y, hand->palm.direction.z);
//    printf("  Confidence: %f\n", hand->confidence);
//    printf("  Pinch Distance: %f\n", hand->pinch_distance);
//    printf("  Pinch Strength: %f\n", hand->pinch_strength);
//    printf("  Grab Strength: %f\n", hand->grab_strength);
//    printf("  Grab Angle: %f\n", hand->grab_angle);
//    printf("  Wrist Position: (%f, %f, %f)\n", hand->arm.prev_joint.x, hand->arm.prev_joint.y, hand->arm.prev_joint.z);
//    printf("  Elbow Position: (%f, %f, %f)\n", hand->arm.next_joint.x, hand->arm.next_joint.y, hand->arm.next_joint.z);

    char *finger_names[5] = {"thumb", "index", "middle", "ring", "pinky"};

    // Digits (fingers)

    /*
    for (int d = 0; d < 5; d++) {
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
*/
}




void createLog(FILE* log, const LEAP_HAND* hand, const int64_t index, char letter, const uint32_t nHands) {
    //FILE* log;
    //log = fopen("../output/log.csv", "w");

//    if (log == NULL) {
//        printf("FILE NOT OPENED, exiting");
//        exit(0);
//    }
//    else {printf("FILE OPENED SUCCEFULLY");}

    //char *header;
    //header = "key,letter,nHands,palmX,palmY,palmZ,"
             "palm_dirX,palm_dirY,palm_dirZ,"
             "palm_orientX,palm_orientY,palm_orientZ,palm_orientW,"
             "arm_prev_jointX,arm_prev_jointY,arm_prev_jointZ"
             "arm_next_jointX,arm_next_jointY,arm_next_jointZ"
             "arm_rotationX,arm_rotationY,arm_rotationZ,arm_rotationW,"
             "pinch_dist,pinch_str,grab_angle,grab_strength,"

             "thumb_extended,"

             "thumb0_prev_jointX,thumb0_prev_jointY,thumb0_prev_jointZ,"
             "thumb0_nex_jointX,thumb0_nex_jointY,thumb0_nex_jointZ"
             "thumb0_rotationX,thumb0_rotationY,thumb0_rotationZ,thumb0_rotationW"

             "thumb1_prev_jointX,thumb1_prev_jointY,thumb1_prev_jointZ,"
             "thumb1_nex_jointX,thumb1_nex_jointY,thumb1_nex_jointZ"
             "thumb1_rotationX,thumb1_rotationY,thumb1_rotationZ,thumb1_rotationW"

             "thumb2_prev_jointX,thumb2_prev_jointY,thumb2_prev_jointZ,"
             "thumb2_nex_jointX,thumb2_nex_jointY,thumb2_nex_jointZ"
             "thumb2_rotationX,thumb2_rotationY,thumb2_rotationZ,thumb2_rotationW"

             "thumb3_prev_jointX,thumb3_prev_jointY,thumb3_prev_jointZ,"
             "thumb3_prev_jointX,thumb3_prev_jointY,thumb3_prev_jointZ,"
             "thumb3_nex_jointX,thumb3_nex_jointY,thumb3_nex_jointZ"
             "thumb3_rotationX,thumb3_rotationY,thumb3_rotationZ,thumb3_rotationW"

             "index_extended,"
             "index0_prev_jointX,index0_prev_jointY,index0_prev_jointZ,"
             "index0_nex_jointX,index0_nex_jointY,index0_nex_jointZ"
             "index0_rotationX,index0_rotationY,index0_rotationZ,index0_rotationW"

             "index1_prev_jointX,index1_prev_jointY,index1_prev_jointZ,"
             "index1_nex_jointX,index1_nex_jointY,index1_nex_jointZ"
             "index1_rotationX,index1_rotationY,index1_rotationZ,index1_rotationW"

             "index2_prev_jointX,index2_prev_jointY,index2_prev_jointZ,"
             "index2_nex_jointX,index2_nex_jointY,index2_nex_jointZ"
             "index2_rotationX,index2_rotationY,index2_rotationZ,index2_rotationW"

             "index3_prev_jointX,index3_prev_jointY,index3_prev_jointZ,"
             "index3_prev_jointX,index3_prev_jointY,index3_prev_jointZ,"
             "index3_nex_jointX,index3_nex_jointY,index3_nex_jointZ"
             "index3_rotationX,index3_rotationY,index3_rotationZ,thumb3_rotationW"

             "middle_extended,"
             "middle0_prev_jointX,middle0_prev_jointY,middle0_prev_jointZ,"
             "middle0_nex_jointX,middle0_nex_jointY,middle0_nex_jointZ"
             "middle0_rotationX,middle0_rotationY,middle0_rotationZ,middle0_rotationW"

             "middle1_prev_jointX,middle1_prev_jointY,middle1_prev_jointZ,"
             "middle1_nex_jointX,middle1_nex_jointY,middle1_nex_jointZ"
             "middle1_rotationX,middle1_rotationY,middle1_rotationZ,middle1_rotationW"

             "middle2_prev_jointX,middle2_prev_jointY,middle2_prev_jointZ,"
             "middle2_nex_jointX,middle2_nex_jointY,middle2_nex_jointZ"
             "middle2_rotationX,middle2_rotationY,middle2_rotationZ,middle2_rotationW"

             "middle3_prev_jointX,middle3_prev_jointY,middle3_prev_jointZ,"
             "middle3_prev_jointX,middle3_prev_jointY,middle3_prev_jointZ,"
             "middle3_nex_jointX,middle3_nex_jointY,middle3_nex_jointZ"
             "middle3_rotationX,middle3_rotationY,middle3_rotationZ,thumb3_rotationW"

             "ring_extended,"
             "ring0_prev_jointX,ring0_prev_jointY,ring0_prev_jointZ,"
             "ring0_nex_jointX,ring0_nex_jointY,ring0_nex_jointZ"
             "ring0_rotationX,ring0_rotationY,ring0_rotationZ,ring0_rotationW"

             "ring1_prev_jointX,ring1_prev_jointY,ring1_prev_jointZ,"
             "ring1_nex_jointX,ring1_nex_jointY,ring1_nex_jointZ"
             "ring1_rotationX,ring1_rotationY,ring1_rotationZ,ring1_rotationW"

             "ring2_prev_jointX,ring2_prev_jointY,ring2_prev_jointZ,"
             "ring2_nex_jointX,ring2_nex_jointY,ring2_nex_jointZ"
             "ring2_rotationX,ring2_rotationY,ring2_rotationZ,ring2_rotationW"

             "ring3_prev_jointX,ring3_prev_jointY,ring3_prev_jointZ,"
             "ring3_prev_jointX,ring3_prev_jointY,ring3_prev_jointZ,"
             "ring3_nex_jointX,ring3_nex_jointY,ring3_nex_jointZ"
             "ring3_rotationX,ring3_rotationY,ring3_rotationZ,thumb3_rotationW"

             "pinky_extended,"
             "pinky0_prev_jointX,pinky0_prev_jointY,pinky0_prev_jointZ,"
             "pinky0_nex_jointX,pinky0_nex_jointY,pinky0_nex_jointZ"
             "pinky0_rotationX,pinky0_rotationY,pinky0_rotationZ,pinky0_rotationW"

             "pinky1_prev_jointX,pinky1_prev_jointY,pinky1_prev_jointZ,"
             "pinky1_nex_jointX,pinky1_nex_jointY,pinky1_nex_jointZ"
             "pinky1_rotationX,pinky1_rotationY,pinky1_rotationZ,pinky1_rotationW"

             "pinky2_prev_jointX,pinky2_prev_jointY,pinky2_prev_jointZ,"
             "pinky2_nex_jointX,pinky2_nex_jointY,pinky2_nex_jointZ"
             "pinky2_rotationX,pinky2_rotationY,pinky2_rotationZ,pinky2_rotationW"

             "pinky3_prev_jointX,pinky3_prev_jointY,pinky3_prev_jointZ,"
             "pinky3_prev_jointX,pinky3_prev_jointY,pinky3_prev_jointZ,"
             "pinky3_nex_jointX,pinky3_nex_jointY,pinky3_nex_jointZ"
             "pinky3_rotationX,pinky3_rotationY,pinky3_rotationZ,thumb3_rotationW";

    //fprintf(log,"%s", header);

    for (int n = 0; n < nHands; n++) {
        fputc('\n', log);
        fprintf(log, "%lld,%c,%u,"
                     "%f,%f,%f,"
                     "%f,%f,%f,"
                     "%f,%f,%f,%f,"
                     "%f,%f,%f,"
                     "%f,%f,%f,"
                     "%f,%f,%f,%f,"
                     "%f,%f,%f,%f"
                     ,

                index, toupper(letter), nHands,
                hand->palm.position.x, hand->palm.position.y, hand->palm.position.z,                         //first line from header
                hand->palm.direction.x, hand->palm.direction.y, hand->palm.direction.z,                                     //first line from header
                hand->palm.orientation.x, hand->palm.orientation.y, hand->palm.orientation.z, hand->palm.orientation.w,     //first line from header
                hand->arm.prev_joint.x,hand->arm.prev_joint.y,hand->arm.prev_joint.z,                                       //second line from header
                hand->arm.next_joint.x,hand->arm.next_joint.y,hand->arm.next_joint.z,                                       //second line from header
                hand->arm.rotation.x,hand->arm.rotation.y,hand->arm.rotation.z,hand->arm.rotation.w,                        //second line from header
                hand->pinch_distance,hand->pinch_strength,hand->grab_angle,hand->grab_strength                             //third line from header
                );

        for (int i = 0; i < 5; i++) {
            fprintf(log,"%u,%f,%f,%f,%f,%f,%f,%f,%f,%f,%f,"          //thumb metacarpal
                        "%f,%f,%f,%f,%f,%f,%f,%f,%f,%f,"             //thumb proximal
                        "%f,%f,%f,%f,%f,%f,%f,%f,%f,%f,"             //thumb intermediate
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
    log = fopen(LOG_PATH, "w");

    if (log == NULL) {
        printf("FILE NOT OPENED, exiting");
        exit(0);
    }
    else {printf("FILE OPENED SUCCEFULLY\n");}

    char *header;
    header = "key,letter,nHands,palmX,palmY,palmZ,palm_dirX,palm_dirY,palm_dirZ,palm_orientX,palm_orientY,palm_orientZ,palm_orientW,arm_prev_jointX,arm_prev_jointY,arm_prev_jointZ,arm_next_jointX,arm_next_jointY,arm_next_jointZ,"
             "arm_rotationX,arm_rotationY,arm_rotationZ,arm_rotationW,"
             "pinch_dist,pinch_str,grab_angle,grab_strength,"

             "thumb_extended,"
             "thumb0_prev_jointX,thumb0_prev_jointY,thumb0_prev_jointZ,"
             "thumb0_nex_jointX,thumb0_nex_jointY,thumb0_nex_jointZ,"
             "thumb0_rotationX,thumb0_rotationY,thumb0_rotationZ,thumb0_rotationW,"

             "thumb1_prev_jointX,thumb1_prev_jointY,thumb1_prev_jointZ,"
             "thumb1_nex_jointX,thumb1_nex_jointY,thumb1_nex_jointZ,"
             "thumb1_rotationX,thumb1_rotationY,thumb1_rotationZ,thumb1_rotationW,"

             "thumb2_prev_jointX,thumb2_prev_jointY,thumb2_prev_jointZ,"
             "thumb2_nex_jointX,thumb2_nex_jointY,thumb2_nex_jointZ,"
             "thumb2_rotationX,thumb2_rotationY,thumb2_rotationZ,thumb2_rotationW,"

             "thumb3_prev_jointX,thumb3_prev_jointY,thumb3_prev_jointZ,"
             "thumb3_nex_jointX,thumb3_nex_jointY,thumb3_nex_jointZ,"
             "thumb3_rotationX,thumb3_rotationY,thumb3_rotationZ,thumb3_rotationW,"

             "index_extended,"
             "index0_prev_jointX,index0_prev_jointY,index0_prev_jointZ,"
             "index0_nex_jointX,index0_nex_jointY,index0_nex_jointZ,"
             "index0_rotationX,index0_rotationY,index0_rotationZ,index0_rotationW,"

             "index1_prev_jointX,index1_prev_jointY,index1_prev_jointZ,"
             "index1_nex_jointX,index1_nex_jointY,index1_nex_jointZ,"
             "index1_rotationX,index1_rotationY,index1_rotationZ,index1_rotationW,"

             "index2_prev_jointX,index2_prev_jointY,index2_prev_jointZ,"
             "index2_nex_jointX,index2_nex_jointY,index2_nex_jointZ,"
             "index2_rotationX,index2_rotationY,index2_rotationZ,index2_rotationW,"

             "index3_prev_jointX,index3_prev_jointY,index3_prev_jointZ,"
             "index3_nex_jointX,index3_nex_jointY,index3_nex_jointZ,"
             "index3_rotationX,index3_rotationY,index3_rotationZ,index3_rotationW,"

             "middle_extended,"
             "middle0_prev_jointX,middle0_prev_jointY,middle0_prev_jointZ,"
             "middle0_nex_jointX,middle0_nex_jointY,middle0_nex_jointZ,"
             "middle0_rotationX,middle0_rotationY,middle0_rotationZ,middle0_rotationW,"

             "middle1_prev_jointX,middle1_prev_jointY,middle1_prev_jointZ,"
             "middle1_nex_jointX,middle1_nex_jointY,middle1_nex_jointZ,"
             "middle1_rotationX,middle1_rotationY,middle1_rotationZ,middle1_rotationW,"

             "middle2_prev_jointX,middle2_prev_jointY,middle2_prev_jointZ,"
             "middle2_nex_jointX,middle2_nex_jointY,middle2_nex_jointZ,"
             "middle2_rotationX,middle2_rotationY,middle2_rotationZ,middle2_rotationW,"

             "middle3_prev_jointX,middle3_prev_jointY,middle3_prev_jointZ,"
             "middle3_nex_jointX,middle3_nex_jointY,middle3_nex_jointZ,"
             "middle3_rotationX,middle3_rotationY,middle3_rotationZ,middle3_rotationW,"

             "ring_extended,"
             "ring0_prev_jointX,ring0_prev_jointY,ring0_prev_jointZ,"
             "ring0_nex_jointX,ring0_nex_jointY,ring0_nex_jointZ,"
             "ring0_rotationX,ring0_rotationY,ring0_rotationZ,ring0_rotationW,"

             "ring1_prev_jointX,ring1_prev_jointY,ring1_prev_jointZ,"
             "ring1_nex_jointX,ring1_nex_jointY,ring1_nex_jointZ,"
             "ring1_rotationX,ring1_rotationY,ring1_rotationZ,ring1_rotationW,"

             "ring2_prev_jointX,ring2_prev_jointY,ring2_prev_jointZ,"
             "ring2_nex_jointX,ring2_nex_jointY,ring2_nex_jointZ,"
             "ring2_rotationX,ring2_rotationY,ring2_rotationZ,ring2_rotationW,"

             "ring3_prev_jointX,ring3_prev_jointY,ring3_prev_jointZ,"
             "ring3_nex_jointX,ring3_nex_jointY,ring3_nex_jointZ,"
             "ring3_rotationX,ring3_rotationY,ring3_rotationZ,ring3_rotationW,"

             "pinky_extended,"
             "pinky0_prev_jointX,pinky0_prev_jointY,pinky0_prev_jointZ,"
             "pinky0_nex_jointX,pinky0_nex_jointY,pinky0_nex_jointZ,"
             "pinky0_rotationX,pinky0_rotationY,pinky0_rotationZ,pinky0_rotationW,"

             "pinky1_prev_jointX,pinky1_prev_jointY,pinky1_prev_jointZ,"
             "pinky1_nex_jointX,pinky1_nex_jointY,pinky1_nex_jointZ,"
             "pinky1_rotationX,pinky1_rotationY,pinky1_rotationZ,pinky1_rotationW,"

             "pinky2_prev_jointX,pinky2_prev_jointY,pinky2_prev_jointZ,"
             "pinky2_nex_jointX,pinky2_nex_jointY,pinky2_nex_jointZ,"
             "pinky2_rotationX,pinky2_rotationY,pinky2_rotationZ,pinky2_rotationW,"

             "pinky3_prev_jointX,pinky3_prev_jointY,pinky3_prev_jointZ,"
             "pinky3_nex_jointX,pinky3_nex_jointY,pinky3_nex_jointZ,"
             "pinky3_rotationX,pinky3_rotationY,pinky3_rotationZ,pinky3_rotationW";

    fprintf(log,"%s", header);

    int loop_cnt = 0;
    char target_letter;

    while (loop_cnt < 3) {

        //printf("How many frames of data?\n");
        //scanf("%d", &nFrames);
        printf("Which letter are you inputting in ASL?\n");
        Sleep(3500);

        if (loop_cnt == 0) {target_letter = 'A';}
        if (loop_cnt == 1) {target_letter = 'B';}
        if (loop_cnt == 2) {target_letter = 'C';}


        //scanf("%c", &target_letter);
        //printf("you entered %c", target_letter);

        //if (target_letter == '0') {break;}

        for (int curr_frame = 0; curr_frame < nFrames;) {
            //printf("\n\n");
            //Sleep(5000);


            LEAP_TRACKING_EVENT *frame = GetFrame();
            if (frame && (frame->tracking_frame_id > lastFrameID)) {
                lastFrameID = frame->tracking_frame_id;
                printf("Frame %lli with %i hands.\n", (long long int) frame->tracking_frame_id, frame->nHands);
                for (uint32_t h = 0; h < frame->nHands; h++) {
                    LEAP_HAND *hand = &frame->pHands[h];
                    //printHandData(hand);
                    if (frame->nHands > 0) {
                        createLog(log, hand, frame->tracking_frame_id, target_letter, frame->nHands);
                        printHandData(hand);
                        curr_frame++;
                        //curr_frame;
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
