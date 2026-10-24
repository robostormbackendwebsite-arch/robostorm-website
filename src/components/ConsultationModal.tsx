import React from 'react';
import SchoolDemoModal from './SchoolDemoModal';
import ActivityCenterModal from './ActivityCenterModal';

export interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'activity_center' | 'stream_lab';
}

export default function ConsultationModal({
  isOpen,
  onClose,
  defaultMode = 'stream_lab'
}: ConsultationModalProps) {
  if (defaultMode === 'activity_center') {
    return <ActivityCenterModal isOpen={isOpen} onClose={onClose} />;
  }
  return <SchoolDemoModal isOpen={isOpen} onClose={onClose} />;
}

export { SchoolDemoModal, ActivityCenterModal };
