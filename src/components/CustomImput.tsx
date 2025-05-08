import React, { useId, useState, useCallback, useEffect, useRef } from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popoverInDialog"
import { Separator } from "@/components/ui/separator"
import { CaretDownIcon, Cross2Icon, DoubleArrowRightIcon, FileIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons"
import { Progress } from "./ui/Progress"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { TagSelectOptions } from "@/app/(protected)/dashboard/components/KanbanSidebar/TagSelect"
import { ControllerRenderProps } from "react-hook-form"
import Dropzone, { useDropzone } from 'react-dropzone'
import { File } from "buffer"
import { useTask } from "@/contexts/TaskContext"
import { useTasks } from "@/contexts/TasksContext"
import { listBoardStages } from "@/actions/board/listBoardStages"
import { listBoards } from "@/actions/board/listBoards"
import { listProjects } from "@/actions/projects/listProjects"
import { listClients } from "@/actions/clients/listClients"
import { ClientAPI, Task } from "@/models"
import { listTaskTypes } from "@/actions/taskTypes/listTaskTypes"
import Loader from "./ui/loader"
import { HoverCardSimple } from "./ui/hover-card"
import { listUsers } from "@/actions/users/listUsers"
import { listTeams } from "@/actions/team/listTeams"
import { Spinner } from "./ui/Spiner"
import equipesGet from "@/actions/equipes-get"
import { Plus, Trash2 } from "lucide-react"
import { Checkbox } from "./ui/checkbox"
import { listTags } from "@/actions/tags/listTags"


type CustomInputType = {
  handleChange?: (value: any, input: string) => void,
  value?: any | undefined,
  name?: string,
  task?: any | undefined,
  isLoadingTask?: boolean
};

export const DragDropUpload: React.FC<{
  showButton?: boolean;
  children?: React.ReactNode;
  label?: string;
  fileTypes?: string;
  files?: React.SetStateAction<File[]>
  // field: object | ControllerRenderProps;
  onUploadFinish?: () => void;
}> = ({
  showButton = true,
  children,
  label = 'Arraste e solte ou clique para fazer upload',
  fileTypes = 'Documento, imagem, vídeo ou áudio',
  // field = {}
}) => {
    const labelId = useId();
    const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
    return (<>
      <Dropzone onDrop={acceptedFiles => setSelectedFiles(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <>
            <div>
              <pre>{JSON.stringify(selectedFiles)}</pre>
            </div>
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="border-2 border-dashed cursor-pointer rounded-lg flex flex-col gap-1 p-6 items-center">

                  <FileIcon className="w-12 h-12" />
                  <span className="text-sm font-medium text-gray-500">{label}</span>
                  <span className="text-xs text-gray-500">{fileTypes}</span>
                </div>
                {/* {showButton && <Button size="lg">Selecionar arquivo</Button>} */}
              </div>
            </section>
          </>
        )}
      </Dropzone>
    </>
    )
  }

export const DateSelector = ({ value, name, handleChange, isLoadingTask = false, time = true }: CustomInputType & { time?: boolean }) => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedValue, setSelectedValue] = useState<Date>(value)
  const [timeValue, setTimeValue] = React.useState<string>("00:00")

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value
    if (!selectedValue) {
      setTimeValue(time)
      return
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10))
    const newSelectedDate = new Date(
      selectedValue.getFullYear(),
      selectedValue.getMonth(),
      selectedValue.getDate(),
      hours,
      minutes
    )
    setSelectedValue(newSelectedDate)
    setTimeValue(time)
  }

  const handleDaySelect = (date: Date | undefined) => {
    if (!timeValue || !date) {
      setSelectedValue(date)
      return
    }
    const [hours, minutes] = timeValue
      .split(":")
      .map((str) => parseInt(str, 10))
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes
    )
    setSelectedValue(newDate)
  }

  // useEffect(() => {
  //   const date = value ? new Date(value as string) : undefined;
  //   if (date) {
  //     setSelectedValue(date)
  //   }
  // }, [value])

  useEffect(() => {
    if (handleChange && name) {
      handleChange(selectedValue, name);
    }
    // console.log('change', { selectedValue })
  }, [selectedValue])

  return (
    <Loader loading={isLoadingTask} className="w-full h-9">
      <Popover open={isOpen} onOpenChange={setIsOpen} modal>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full font-bold flex gap-2 justify-between items-center"
          >
            {selectedValue ? (
              <>{`${selectedValue.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })} ${selectedValue.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
              })} (${selectedValue.toLocaleDateString('pt-BR', { weekday: 'long' })})`}</>
            ) : (
              <>Selecionar Data</>
            )}

            <CaretDownIcon className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-59" side="bottom" align="end">
          <Calendar
            mode="single"
            selected={selectedValue}
            onSelect={handleDaySelect}
            className="rounded-md border"
            footer={time &&
              <>
                <Separator className="mt-2 mb-2" />
                <p className="flex justify-center ">
                  <Input
                    className="w-24"
                    type="time"
                    value={timeValue}
                    onChange={handleTimeChange}
                  />
                </p>
              </>
            }
          />
          <div className="space-y-2 p-2">
            <Button className="w-full" onClick={() => setIsOpen(false)}>
              Confirmar
            </Button>
            {/* <Button className="w-full" onClick={() => setIsOpen(false)} variant={'secondary'} >Cancelar</Button> */}
          </div>
        </PopoverContent>
      </Popover>
    </Loader>
  )
}

export const BoardSelector = ({ handleChange, value, name, isLoadingTask = false }: CustomInputType) => {
  // 

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedValue, setSelectedValue] = useState<TagSelectOptions | null>(value ? {
    value: value?.id,
    label: value?.name,
  } : null)
  const [options, setOptions] = useState<TagSelectOptions[]>([])

  useEffect(() => {
    setSelectedValue({
      value: value?.id,
      label: value?.name,
    })
  }, [value])


  const updateBoardList = async () => {
    const newBoards = await listBoards();
    // console.log({ newBoards });
    const newOptions: TagSelectOptions[] = [];
    newBoards?.forEach((board: { id: string; name: string }) => {
      newOptions.push({
        value: board?.id,
        label: board?.name,
      })
    })
    setOptions(newOptions)
    if (newOptions.length === 1 && newOptions[0].value !== value) {
      setSelectedValue(newOptions[0])
    }
  };

  useEffect(() => {
    updateBoardList()
  }, [])


  const onSelect = (item: TagSelectOptions) => {
    if (item) {
      setSelectedValue(item)
      if (handleChange && name) {
        handleChange(item, name)
      }
      setIsOpen(false)
    }
  }

  return (
    <Loader loading={isLoadingTask} className="w-full h-9">
      <Popover open={isOpen} onOpenChange={setIsOpen} modal>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full font-bold flex gap-2 justify-between items-center pr-2">
            {selectedValue ? <>{selectedValue.label}</> : <>Selecionar quadro</>}
            <CaretDownIcon className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom" align="end">
          <Command>
            <CommandInput placeholder="Pesquise" />
            <CommandList>
              <CommandEmpty>Nenhum quadro encontrado.</CommandEmpty>
              <CommandGroup>
                {options.map((option, key) => (
                  <CommandItem

                    key={key}
                    // value={option.label}
                    className={selectedValue?.value === option.value ? "bg-accent text-accent-foreground" : ""}
                    onSelect={() => onSelect(option)}
                  >
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <Separator />
            <div className="w-full p-2 space-y-2">
              <Button className="w-full">Criar novo quadro</Button>
              <Button className="w-full" variant={'secondary'} onClick={() => setIsOpen(false)}>Cancelar</Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </Loader>
  )
}


type UserTagSelectOptions = TagSelectOptions & {
  type?: 'team' | 'user';
  group?: string | false;
};

type UserSelectorInputProps = CustomInputType & {
  userType: 'team' | 'user';
  multiple?: boolean;
};

export const UserSelector = ({ handleChange, value, name, isLoadingTask = false, userType, multiple = false }: UserSelectorInputProps) => {

  const [isOpen, setIsOpen] = useState<boolean | number>(false)
  const [selectedValue, setSelectedValue] = useState<UserTagSelectOptions[] | [] | UserTagSelectOptions | null>(multiple ? [] : null)
  const [options, setOptions] = useState<UserTagSelectOptions[]>([])

  useEffect(() => {
    if (value) {
      setSelectedValue(value)
    } else {
      setSelectedValue(multiple ? [] : null)
    }
  }, [value])

  const updateOptionsList = async () => {
    const newOptions: UserTagSelectOptions[] = [];
    if (userType === 'team') {
      const newList = await equipesGet();
      newList?.forEach((team: { id: string; name: string }) => {
        newOptions.push({
          value: team?.id,
          label: team?.name,
        })
      })
    }
    else if (userType === 'user') {
      const newList = await listUsers();
      newList?.forEach((user: { id: string; name: string }) => {
        newOptions.push({
          value: user?.id,
          label: user?.name,
          group: 'Sem Equipe'
        })
      })
    }
    setOptions(newOptions)
  };

  useEffect(() => {
    updateOptionsList()
    setSelectedValue(multiple ? [] : null)
  }, [userType])

  const onSelect = (item: UserTagSelectOptions) => {
    if (item) {
      console.log({ selectedValue })
      let selected;
      if (Array.isArray(selectedValue)) {
        if (selectedValueArray.find((i) => i?.value === item.value)) {
          selected = selectedValue.filter((selected) => selected.value !== item.value)
        } else {
          selected = [...(selectedValue as UserTagSelectOptions[]), item]
        }
      } else {
        selected = item
      }
      setSelectedValue(selected)
      // console.log({ selected })
      if (handleChange && name) {
        handleChange(selected, name)
      }
      setIsOpen(false)
    }
  }

  const label = (() => {
    if (userType === 'user') {
      if (Array.isArray(selectedValue) && selectedValue.length > 0) {
        return 'Quem mais trabalhará na tarefa?';
      } else {
        return 'Quem trabalhará na tarefa?';

      }
    } else if (userType === 'team') return 'Qual equipe trabalhará na tarefa?';
  })()

  const selectedValueArray = [...new Array((Array.isArray(selectedValue) ? selectedValue.length : 0) + 1)].map((_, i) => {
    if (Array.isArray(selectedValue)) {
      return selectedValue[i] || null
    } else {
      return selectedValue
    }
  })

  const groups = userType === 'user' ? [...new Set(options.map(t => t.group))] : [1];
  return (
    <Loader loading={isLoadingTask} className="w-full h-9">
      <div className="space-y-2">
        {selectedValueArray.map((selectedValue, i) => {
          return (
            <Popover key={i} open={isOpen === i} onOpenChange={() => setIsOpen(isOpen === i ? false : i)} modal>
              <PopoverTrigger asChild >
                <Button variant="outline" className="w-full font-bold flex gap-2 justify-between items-center pr-2">
                  <span className="w-full flex justify-between items-center">
                    {selectedValue ? <>{selectedValue.label} {multiple && <Cross2Icon className="h-4 w-4" onClick={() => {
                      onSelect(selectedValue);
                    }} />}</> : <>{label}</>}
                  </span>
                  <CaretDownIcon className="h-6 w-6" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" side="bottom" align="end">
                <Command>
                  <CommandInput placeholder="Pesquise" />
                  <CommandList>
                    <CommandEmpty>Nada encontrado.</CommandEmpty>
                    {groups.map((group, key) => (
                      <CommandGroup heading={userType === 'user' ? group as string : undefined} key={key}>
                        {options.filter(o => userType === 'user' ? o.group === group : true).map((item, key) => {
                          const isSelected = selectedValueArray.find((i) => i?.value === item.value);
                          return (
                            <CommandItem
                              key={key}
                              // value={item.value}
                              // keywords={[item.label, item.group].filter(item => typeof item === 'string')}
                              className={isSelected ? "bg-accent text-accent-foreground" : ""}
                              onSelect={() => onSelect(item)}
                            >
                              <span className="w-full flex justify-between items-center">
                                {item.label}
                                {isSelected && multiple && <Cross2Icon className="h-4 w-4" onClick={() => onSelect(item)} />}
                              </span>
                            </CommandItem>
                          )
                        })}
                      </CommandGroup>
                    ))}
                  </CommandList>
                  <Separator />
                  <div className="w-full p-2 space-y-2">
                    <Button className="w-full" variant={'secondary'} onClick={() => setIsOpen(false)}>Cancelar</Button>
                  </div>
                </Command>
              </PopoverContent>
            </Popover>
          )
        })}
      </div>
    </Loader>
  )
}

export const ColumnSelector = ({ showNextStepButton, handleChange, boardId, value, name, isLoadingTask = false }: CustomInputType & { showNextStepButton?: boolean | undefined, boardId?: string }) => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedValue, setSelectedValue] = useState<TagSelectOptions | null>(value ? {
    value: value?.id,
    label: value?.name,
  } : null)
  const [options, setOptions] = useState<TagSelectOptions[]>([])

  useEffect(() => {
    setSelectedValue({
      value: value?.id,
      label: value?.name,
    })
  }, [value])

  const updateBoardStage = async () => {
    const newBoardStages = await listBoardStages(boardId);
    // console.log({ newBoardStages });
    const newOptions: TagSelectOptions[] = [];
    newBoardStages?.forEach((boardStage: { id: string; name: string }) => {
      newOptions.push({
        value: boardStage?.id,
        label: boardStage?.name,
      })
    })
    setOptions(newOptions)
  };

  useEffect(() => {
      updateBoardStage()
  }, [boardId])

  const onSelect = (item: TagSelectOptions) => {
    if (item) {
      setSelectedValue(item)
      if (handleChange && name) {
        handleChange(item, name)
      }
      setIsOpen(false)
    }
  }

  return (
    <Loader loading={isLoadingTask} className="w-full h-9">
      <div className="flex gap-2">
        <Popover open={isOpen} onOpenChange={setIsOpen} modal>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full font-bold flex gap-2 justify-between items-center pr-2">
              {selectedValue ? <>{selectedValue.label}</> : <>Selecionar Etapa</>}
              <CaretDownIcon className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" side="bottom" align="end">
            <Command>
              <CommandInput placeholder="Pesquise" />
              <CommandList>
                <CommandEmpty>Nenhuma etapa encontrada.</CommandEmpty>
                <CommandGroup>
                  {options.map((option, key) => (
                    <CommandItem
                      key={key}
                      // value={status.value}
                      onSelect={() => onSelect(option)}
                      className={selectedValue?.value === option.value ? "bg-accent text-accent-foreground" : ""}
                    >
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
              <Separator />
              <div className="w-full p-2">
                <Button className="w-full" variant={'secondary'} onClick={() => setIsOpen(false)}>Cancelar</Button>
              </div>
            </Command>
          </PopoverContent>
        </Popover>
        {!!showNextStepButton && <HoverCardSimple contentProps={{ align: 'end' }} text="Mover para a próxima etapa">
          <Button className="flex-none" size="icon" variant={'secondary'}><DoubleArrowRightIcon /></Button>
        </HoverCardSimple>}
      </div>
    </Loader>
  )
}

export const ProjectSelector = ({ handleChange, name, value, task = {}, isLoadingTask = false, clientId }: CustomInputType & { clientId?: string }) => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(isLoadingTask);

  useEffect(() => {
    setIsLoading(isLoadingTask)
  }, [isLoadingTask])

  const [selectedValue, setSelectedValue] = useState<TagSelectOptions | null>()
  const [options, setOptions] = useState<TagSelectOptions[]>([])

  useEffect(() => {
    if (value) {
      setSelectedValue(value)
    } else if (!!task?.project?.id && !!task?.project?.name) {
      setSelectedValue({
        value: task?.project.id,
        label: task?.project.name,
      })
    } else {
      setSelectedValue(null)
    }
    // console.log(task?.project)
  }, [task, value])

  const updateProjects = async () => {
    const newOptions: TagSelectOptions[] = [];
    setIsLoading(true);
    if (clientId) {
      const projectsResponse = await listProjects({ clientId });
      projectsResponse?.projects?.forEach((project) => {
        newOptions.push({
          value: project?.id,
          label: project?.name,
        })
      })
    }
    setOptions(newOptions)
    setIsLoading(false);
  };

  useEffect(() => {
    updateProjects()
  }, [])

  useEffect(() => {
    updateProjects()
    if (!!clientId) {
      setSelectedValue(null)
    }
  }, [clientId, task?.clientId])


  const onSelect = (value: string | undefined) => {
    const selected = options.find((priority) => priority.value === value) || null
    setSelectedValue(selected)
    // console.log({ selected })
    if (handleChange && name) {
      handleChange(selected, name)
    }
    setIsOpen(false)
  }

  return (
    <Loader loading={isLoadingTask} className="w-full h-9">
      <Popover open={isOpen} onOpenChange={setIsOpen} modal>
        <PopoverTrigger asChild aria-expanded={isOpen}>
          <Button variant="outline" className="w-full font-bold flex gap-2 justify-between items-center pr-2">
            <span className="w-full flex justify-between">
              {selectedValue ? <>{selectedValue.label}</> : <>Selecionar Projeto</>} {isLoading && <Spinner />}
            </span>
            <CaretDownIcon className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom" align="end" >
          <Command>
            <CommandInput placeholder="Pesquise" />
            <CommandList>
              <CommandEmpty className="flex justify-center p-3 ">
                {isLoading ?
                  <Spinner /> :
                  clientId ? 'Nenhum projeto encontrado.' : 'Selecione um cliente.'
                }
              </CommandEmpty>
              {!isLoading && options.map((option, key) => (
                <CommandItem
                  key={key}
                  className={selectedValue?.value === option.value ? "bg-accent text-accent-foreground" : ""}
                  onSelect={() => onSelect(option.value)}
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandList>
            <Separator />
            <div className="w-full p-2">
              <Button className="w-full" variant={'secondary'} onClick={() => setIsOpen(false)}>Cancelar</Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </Loader>
  )
}

export const ClientSelector = ({ handleChange, name, value, task = {}, isLoadingTask = false }: CustomInputType) => {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [selectedValue, setSelectedValue] = useState<TagSelectOptions | null>()
  const [options, setOptions] = useState<TagSelectOptions[]>([])

  useEffect(() => {
    if (value) {
      setSelectedValue(value)
    } else if (!!task?.client?.id && !!task?.client?.name) {
      setSelectedValue({
        value: task?.client.id,
        label: task?.client.name,
      })
    } else {
      setSelectedValue(null)
    }
    // console.log(task?.project)
  }, [task, value])


  const updateClients = async () => {
    const clientsResponse = await listClients({});
    const newOptions: TagSelectOptions[] = [];
    clientsResponse.clients.forEach((client: { id: any; name: any }) => {
      newOptions.push({
        value: client.id,
        label: client.name,
      })
    })
    setOptions(newOptions)
  };

  useEffect(() => {
    updateClients()
  }, [])

  const onSelect = (value: string | undefined) => {
    const selected = options.find((priority) => priority.value === value) || null
    setSelectedValue(selected)
    // console.log({ selected })
    if (handleChange && name) {
      handleChange(selected, name)
    }
    setIsOpen(false)
  }

  return (
    <Loader loading={isLoadingTask} className="w-full h-9">
      <Popover open={isOpen} onOpenChange={setIsOpen} modal>
        <PopoverTrigger asChild aria-expanded={isOpen}>
          <Button variant="outline" className="w-full font-bold flex gap-2 justify-between items-center pr-2">
            {selectedValue ? <>{selectedValue.label}</> : <>Selecionar Cliente</>}
            <CaretDownIcon className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom" align="end" >
          <Command>
            <CommandInput placeholder="Pesquise" />
            <CommandList>
              <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
              <Separator />
              {options.map((option, key) => (
                <CommandItem
                  key={key}
                  // value={option.value}
                  onSelect={() => onSelect(option.value)}
                  className={selectedValue?.value === option.value ? "bg-accent text-accent-foreground" : ""}
                >
                  {option.label}

                </CommandItem>
              ))}
            </CommandList>
            <Separator />
            <div className="w-full p-2">
              <Button className="w-full" variant={'secondary'} onClick={() => setIsOpen(false)}>Cancelar</Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </Loader>
  )
}

type TypeOptions = TagSelectOptions & {
  color?: string,
  time?: string
}

export const TypeSelector = ({ handleChange, name, value, task = {}, isLoadingTask = false }: CustomInputType) => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedValue, setSelectedValue] = useState<TypeOptions | null>(null)
  const [options, setOptions] = useState<TypeOptions[]>([])

  useEffect(() => {
    if (value) {
      setSelectedValue(value)
    } else if (!!task?.taskTypeId && !!task?.taskType?.title) {
      setSelectedValue({
        value: task?.taskTypeId,
        label: task?.taskType?.title,
      })
    } else {
      setSelectedValue(null)
    }
    // console.log(task?.project)
  }, [task, value])

  const updateTypes = async () => {
    const typesResponse = await listTaskTypes({ perPage: 1000 });
    // console.log({ typesResponse })
    const newOptions: TypeOptions[] = [];
    typesResponse?.taskType?.forEach((type) => {
      newOptions.push({
        value: type?.id,
        label: type?.title,
        color: type?.color,
      })
    })
    setOptions(newOptions)
  };

  useEffect(() => {
    updateTypes()
  }, [])

  useEffect(() => {
    updateTypes()
  }, [selectedValue])


  const onSelect = (value: string | undefined) => {
    const selected = options.find((priority) => priority.value === value) || null
    setSelectedValue(selected)
    // console.log({ selected })
    if (handleChange && name) {
      handleChange(selected, name)
    }
    setIsOpen(false)
  }

  return (
    <Loader loading={isLoadingTask} className="w-full h-9">
      <Popover open={isOpen} onOpenChange={setIsOpen} modal>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full font-bold flex gap-2 justify-between items-center pr-2">
            {selectedValue ? <>
              <div className="flex items-center gap-2">
                <span className={`block h-4 w-4 rounded`} style={{ background: selectedValue.color }} />
                {selectedValue.label}
              </div>
            </> : <>Selecionar Tipo</>}


            <CaretDownIcon className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom" align="end">
          <Command>
            <CommandInput placeholder="Pesquise" />
            <CommandList>
              <CommandEmpty>Nenhuma tipo encontrado.</CommandEmpty>
              <CommandGroup>
                {options.map((option, key) => (
                  <CommandItem
                    key={key}
                    // value={status.value}
                    onSelect={() => onSelect(option.value)}
                    className={selectedValue?.value === option.value ? "bg-accent text-accent-foreground" : ""}

                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <span className={`block h-4 w-4 rounded`} style={{ background: option.color }} />
                        {option.label}
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{option?.time}</span>
                        <Button variant={'default'} className="w-5 h-5 bg-transparent text-inherit" size={'icon'} onClick={e => e.preventDefault()}><Pencil2Icon /></Button>
                      </div>
                    </div>

                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <Separator />
            <div className="w-full p-2">
              <Button className="w-full" variant={'secondary'} onClick={() => setIsOpen(false)}>Cancelar</Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </Loader>
  )
}

export const TimeCounter = ({ handleChange, task = {}, isLoadingTask = false }: CustomInputType) => {


  return (

    <Loader loading={isLoadingTask} className="w-full h-9">
      <div className="flex gap-2 items-center">

        <Button variant="outline" className="flex-none">
          87h00
        </Button>
        <Progress value={33} className="h-2 w-full" />
        <Button variant="outline" className="flex-none">
          200h00
        </Button>
      </div>
    </Loader>
  )
}

type TagOptions = TagSelectOptions & {
  color: string
}
const fakeTags: TagOptions[] = [
  {
    value: "Tag 1",
    label: "Tag 1",
    color: '#F8BBD0'
  },
  {
    value: "Tag 2",
    label: "Tag 2",
    color: "#D1C4E9"
  },
  {
    value: "Tag 3",
    label: "Tag 3",
    color: "#B2EBF2"
  },
  {
    value: "Tag 4",
    label: "Tag 4",
    color: "#F0F4C3"
  },
]
export const TagSelector = ({ value = [], name, handleChange, isLoadingTask = false }: CustomInputType) => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedValue, setSelectedValue] = useState<TagOptions[]>([])
  const [options, setOptions] = useState<TagOptions[]>(fakeTags)

  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(selectedValue)) {
      setSelectedValue(value.length > 0 ? value : [])
    }
  }, [value])

  const colorFix = (color: string) => {
    if (color && color.length === 6) {
      return '#' + color;
    } else if (color && color.length === 7) {
      return color;
    } else {
      return '#fffffF'
    }
  }

  const updateOptionsList = async () => {
    const newTags = await listTags();
    // console.log({ newBoards });
    const newOptions: TagOptions[] = [];
    newTags?.forEach((tag) => {
      newOptions.push({
        value: tag.id,
        label: tag.title,
        color: colorFix(tag.color)
      })
    })
    setOptions(newOptions)
  };

  useEffect(() => {
    updateOptionsList()
  }, [])

  const onSelect = (item: TagOptions) => {
    if (item) {
      let selected;
      if (selectedValue.find((i) => i?.value === item.value)) {
        selected = selectedValue.filter((selected) => selected.value !== item.value)
      } else {
        selected = [...selectedValue, item]
      }
      setSelectedValue(selected)
      // console.log({ selected })
      if (handleChange && name) {
        handleChange(selected, name)
      }
      // setIsOpen(false)
      console.log(selected);
    }
  }
  function getContrastColor(hex: string): string {
    if (!hex) return '#000000';
    // Remove o "#" se existir
    hex = hex.replace('#', '');

    // Converte para RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calcula o brilho (YIQ)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Retorna preto ou branco com base no brilho
    return brightness > 128 ? '#000000' : '#FFFFFF';
  }
  return (
    <Loader loading={isLoadingTask} className="w-full h-9">
      <Popover open={isOpen} onOpenChange={setIsOpen} modal >
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full font-bold flex gap-2 justify-between items-center pr-2">
            {selectedValue.length > 0 ? <span className="flex gap-2 items-center">
              {selectedValue.map((value, key) => <span key={key} className={`inline-flex gap-2 items-center pl-3 pr-1 py-0 rounded`} style={{ background: value.color, color: getContrastColor(value.color) }}>
                {value.label}
                <Cross2Icon className="h-4 w-4" onClick={(e) => {
                  e.preventDefault();
                  onSelect(value);
                }} />
              </span>)}
            </span> : <>Selecionar Tag</>}
            <CaretDownIcon className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom" align="end" >
          <Command>
            <CommandInput placeholder="Pesquise" />
            <CommandList>
              <CommandEmpty>Nenhuma tag encontrada.</CommandEmpty>
              <CommandGroup>
                {options.map((option, key) => (
                  <CommandItem
                    key={key}
                    // value={status.value}
                    className={selectedValue.filter(a => a?.value === option.value).length > 0 ? "bg-accent text-accent-foreground" : ""}
                    onSelect={() => onSelect(option)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`inline-block px-3 py-0 rounded`} style={{ background: option.color, color: getContrastColor(value.color) }}>
                        {option.label}
                      </span>
                      <div className="flex items-center gap-1">
                        <Button variant={'default'} className="w-5 h-5 bg-transparent text-inherit" size={'icon'} onClick={e => e.preventDefault()}><Pencil2Icon /></Button>
                        <Button variant={'destructive'} className="w-5 h-5 bg-transparent" size={'icon'} onClick={e => e.preventDefault()}><TrashIcon /></Button>
                        {selectedValue.filter(a => a?.value === option.value).length > 0 && <Button variant={'destructive'} className="w-5 h-5 bg-transparent" size={'icon'} onClick={(e) => {
                          e.preventDefault();
                          onSelect(value);
                        }}><Cross2Icon className="h-4 w-4" /></Button>}
                      </div>
                    </div>

                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <Separator />
            <div className="w-full p-2">
              <Button className="w-full" variant={'secondary'} onClick={() => setIsOpen(false)}>Cancelar</Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </Loader>
  )
}
export function TodoRepeater({ value = [], name, handleChange }: CustomInputType) {


  type TodoItem = {
    label: string;
    checked: boolean;
  };

  const [items, setItems] = useState<TodoItem[]>([...
    value.length > 0 ? value.filter(({ label }: { label?: string }) => !!label && label !== '') : [],
  { label: '', checked: false }]);

  const updateItem = (index: number, updatedItem: Partial<TodoItem>) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], ...updatedItem };
    setItems(newItems);
  };

  const addItem = () => {
    if (!items[items.length - 1].label.trim()) return;
    setItems([...items, { label: '', checked: false }]);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems.length > 0 ? newItems : [{ label: '', checked: false }]);
  };

  useEffect(() => {
    if (handleChange && name) {
      handleChange(items, name);
    }
  }, [items]);

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <Checkbox
            checked={item.checked}
            onCheckedChange={(checked) =>
              updateItem(index, { checked: !!checked })
            }
          />
          <Input
            value={item.label}
            onChange={(e) => updateItem(index, { label: e.target.value })}
            placeholder="Descrição do item"
          />
          {item.label && items.length !== index + 1 && <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeItem(index)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>}
        </div>
      ))}
      <center>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={addItem}
          disabled={!items[items.length - 1].label.trim()}
        >
          <Plus className="w-4 h-4 mr-2" /> Adicionar item
        </Button>
      </center>
    </div>
  );
}


const CustomImput = {
  DateSelector,
  BoardSelector,
  ColumnSelector,
  ProjectSelector,
  TypeSelector,
  TimeCounter,
  TagSelector,
  TodoRepeater
}
export default CustomImput

